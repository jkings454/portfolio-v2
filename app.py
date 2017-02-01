"""
This is the entry point of the application.
"""
from flask import Flask, render_template, jsonify, request, g
from models import User, Project, ImageProject, TextProject, Base, Course
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine, or_
from flask_httpauth import HTTPTokenAuth
from flask_cors import CORS
from config import Config

TIMEOUT = 30

auth = HTTPTokenAuth()
app = Flask(__name__)

# Configures Cross origin resource sharing.
# Anybody from any origin can access /api/ urls.
CORS(app, resources={r'/api/*':{'origins':'*'}})

# app_config holds information about databases and other things.
# Yeah, I could just use the provided config thing, but whatever.
app_config = Config.production()

# Code for setting up the database session.
engine = create_engine(app_config.db_uri)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


# Login methods
@auth.verify_token
def verify_token(token):
    # First we check and see if the user provided us with a token or a username and password.
    print token
    user_id = User.verify_auth_token(token)

    user = session.query(User).filter_by(id=user_id).first()

    if user:
        g.user = user
        return True
    else:
        return False

# Public URLs
# VIEWS
@app.route("/")
@app.route("/blog")
@app.route("/projects")
@app.route("/courses")
@app.route("/login")
def index():
    # Because we are using React Router, we only need one page for most views.
    return render_template("index.html")

@app.route("/courses/<int:course_id>")
def get_course(course_id):
    # React will take care of the logic here.
    return render_template("index.html")

# COURSES
@app.route("/api/v1/courses")
def get_api_courses():
    offset = request.args.get("offset", type=int)
    limit = request.args.get("limit", type=int)
    search = request.args.get("search", type=str)

    query = session.query(Course)

    if search:
        query = query.filter(or_(Course.name.contains(search), Course.description.contains(search)))

    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    courses = query.all()
    if request.args.get("truncated", type=bool):
        return jsonify(only_basic_info(courses))
    # Everything with an api url will return json.
    return jsonify([i.serialize for i in courses])

@app.route("/api/v1/courses/<int:id>")
def get_api_course(id):
    # Similar to the first method, however only one course is requested.
    course = session.query(Course).filter_by(id=id).first()
    return jsonify(course.serialize)

# PROJECTS
@app.route("/api/v1/courses/<int:course_id>/projects")
def get_api_course_projects(course_id):
    # Gets projects from a specific course.
    limit = request.args.get("limit", type=int)
    offset = request.args.get("offset", type=int)
    search = request.args.get("search", type=str)
    query = session.query(Project).filter_by(course_id=course_id)

    if search:
        query = query.filter(or_(Project.description.contains(search), Project.name.contains(search)))

    if limit:
        query = query.limit(limit)
    if offset:
        query = query.offset(offset)

    projects = query.all()
    if request.args.get("truncated", type=bool):
        return only_basic_info(projects)

    return jsonify([i.serialize for i in projects])

@app.route("/api/v1/projects/<int:project_id>")
def get_api_project(project_id):
    # Gets a specific project. Doesn't care about courses.
    project = session.query(Project).filter_by(id=project_id).first()
    return jsonify(project.serialize)

@app.route("/api/v1/projects")
def get_api_projects():
    # How many projects does the user want?
    limit = request.args.get("limit", type=int)
    offset = request.args.get("offset", type=int)
    search = request.args.get("search", type=str)

    query = session.query(Project)
    if search:
        for prop in search.split(" "):
            query = query.filter(or_(Project.description.ilike("%"+prop+"%"), Project.name.ilike("%"+prop+"%")))

    if limit:
        query = query.limit(limit)
    if offset:
        query = query.offset(offset)

    projects = query.all()

    if request.args.get("truncated", type=bool):
        return only_basic_info(projects)

    return jsonify([i.serialize for i in projects])

# Protected URLs

# User can request a "token" in to allow persistent yet stateless access to these URLs.
@app.route("/token", methods=['GET'])
@auth.login_required
def get_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode(), "expires_in": 600 })

# This route is different. Instead of accepting a token, it accepts a username and password.
# If the username and password is valid, the server will exchange it for an access token,
# which can be used to perform POST, PATCH, and DELETE requests.
@app.route("/token", methods=['POST'])
def post_token():
    username = request.form.get("username", type=str)
    password = request.form.get("password", type=str)
    if not username or not password:
        return "No credentials provided", 401
    else:
        user = session.query(User).filter_by(username=username).first()
        if not user or not user.check_hash(password):
            return "Not Authorized", 401
        else:
            g.user = user
            print user.username
            token = user.generate_auth_token()
            print "User token: " + token
            print "Does the token work? User according to token: " + str(User.verify_auth_token(token))
            return jsonify({'token': token.decode(), "expires_in": 600})
# COURSES
@app.route("/api/v1/courses", methods = ["POST"])
@auth.login_required
def post_api_course():
    # User has made a post request, indicating that they would like to add a course.
    # Here we collect the necessary information.
    name = request.form.get("name", type=str)
    description = request.form.get("description", type=str)
    # We create the course and submit it to our database.
    new_course = Course(name=name, description=description)
    session.add(new_course)
    session.commit()
    # Now we return the course so that our user knows their request was successful.
    return jsonify(new_course.serialize)

@app.route("/api/v1/courses/<int:id>", methods = ["PATCH", "DELETE"])
@auth.login_required
def patch_delete_api_course(id):
    # There are two valid methods for this, PATCH and DELETE
    course = session.query(Course).filter_by(id=id).first()
    if request.method == "PATCH":
        # The user wishes to change one or more properties of the course.
        # Parameters are OPTIONAL. Any param not provided will remain unchanged.
        course.name = request.args.get("name") or course.name
        course.description = request.args.get("description") or course.description
        session.add(course)
        session.commit()
        return course.serialize
    if request.method == "DELETE":
        # Unfortunately, the user has decided that the course must die.
        session.delete(course)
        session.commit()
        return jsonify(course.serialize)

# PROJECTS
@app.route("/api/v1/projects/<int:project_id>", methods=["PATCH", "DELETE"])
@auth.login_required
def patch_delete_api_project(project_id):
    # Two methods are available: PATCH and POST
    project = session.query(Project).filter_by(id=project_id).first()
    if g.user.id != project.user_id:
        # Sneaky user trying to change someone else's stuff!
        return "Unauthorized access", 401
    if request.method == "PATCH":
        # First, we get the methods that EVERY type of project should have.
        # name, description, and course_id.
        project.name = request.args.get("name", type=str) or project.name
        project.description = request.args.get("description", type=str) or project.description
        project.course_id = request.args.get("course_id", type=int) or project.course_id
        if project.type == "image_project":
            # The project is an image_project, so we should update the image_url if necessary.
            project.image_url = request.args.get("image_url", type=str) or project.image_url
            # add and commit...
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        elif project.type == "text_project":
            # The project is a text_project, so we should treat it as such.
            project.content = request.args.get("content", type=str) or project.content
            project.content_type = request.args.get("content_type", type=str) or project.content_type
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        elif project.type == "project":
            # The project is a plain old project. Just add and commit.
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        else:
            # For some reason, the project has an invalid type. This shouldn't happen.
            return jsonify({"Something went horribly wrong": "type invalid or not provided"}), 500
    else:
        # The method is delete, so we must delete.
        session.delete(project)
        session.commit()
        return jsonify(project.serialize)

@app.route("/api/v1/courses/<int:course_id>/projects", methods=["POST"])
@auth.login_required
def post_api_project(course_id):
    # Behold, A new project is born.
    name = request.form.get('name', type=str)
    type = request.form.get('type', type=str)
    user_id = g.user.id
    course_id = course_id
    description = request.form.get('description', type=str)
    if type == "image_project":
        # The user has told us that this is an image project. Let's act accordingly.
        image_url = request.form.get('image_url', type=str)
        new_project = ImageProject(name=name, type=type, user_id=user_id, description=description,
                                   image_url=image_url, course_id=course_id)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    elif type == "text_project":
        # It's a text project, how exciting!
        content = request.form.get('content', type=str)
        content_type = request.form.get('content_type', type=str)
        new_project = TextProject(name=name, type=type, user_id=user_id, description=description,
                                  content=content, content_type=content_type, course_id=course_id)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    elif type == "project":
        # It's a plain old project. Everything is already taken care of.
        new_project = Project(name=name, type=type, user_id=user_id,
                              description=description, course_id=course_id)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    else:
        # The user didn't read our glorious documentation and has provided an invalid type.
        return jsonify({"error creating project":"the type is invalid or missing."}), 400

@app.route("/sign_s3")
@auth.login_required
def sign_s3():
    #TODO: create method to allow users to upload images and documents to s3
    pass

def only_basic_info(data):
    data = [ i.serialize for i in data]

    return [{"name": c["name"], "id": c["id"]} for c in data]

if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
