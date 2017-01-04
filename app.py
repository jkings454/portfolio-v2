"""
This is the entry point of the application.
"""
from flask import Flask, render_template, jsonify, request, g
from models import User, Project, ImageProject, TextProject, Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
from config import Config

auth = HTTPBasicAuth()
app = Flask(__name__)
CORS(app, resources={r'/api/*':{'origins':'*'}})

app_config = Config.development()

engine = create_engine(app_config.db_uri)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@auth.verify_password
def verify_password(username, password):
    user_id = User.verify_auth_token(username)
    if user_id:
        user = session.query(User).filter_by(id=user_id).first()
    else:
        user = session.query(User).filter_by(username=username).first()
        if not user or not user.check_hash(password):
            return False

    g.user = user
    return True

@app.route("/token")
@auth.login_required
def get_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode()})

@app.route("/")
@app.route("/blog")
@app.route("/projects")
@app.route("/login")
def index():
    return render_template("index.html")


@app.route("/api/v1/projects")
def get_api_projects():
    projects = session.query(Project).all()
    return jsonify([i.serialize for i in projects])


@app.route("/api/v1/projects", methods=["POST"])
@auth.login_required
def post_api_project():
    name = request.form.get('name', type=str)
    type = request.form.get('type', type=str)
    user_id = g.user.id
    description = request.form.get('description', type=str)
    if type == "image_project":
        image_url = request.form.get('image_url', type=str)
        new_project = ImageProject(name=name, type=type, user_id=user_id, description=description, image_url=image_url)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    elif type == "text_project":
        content = request.form.get('content', type=str)
        content_type = request.form.get('content_type', type=str)
        new_project = TextProject(name=name, type=type, user_id=user_id, description=description, content=content,
                                  content_type=content_type)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    elif type == "project":
        new_project = Project(name=name, type=type, user_id=user_id, description=description)
        session.add(new_project)
        session.commit()
        return jsonify(new_project.serialize)
    else:
        return jsonify({"error creating project":"the type is invalid or missing."}), 400




@app.route("/api/v1/projects/<int:project_id>")
def get_api_project(project_id):
    project = session.query(Project).filter_by(id=project_id).first()
    return jsonify(project.serialize)

@app.route("/api/v1/projects/<int:project_id>", methods=["PATCH", "DELETE"])
@auth.login_required
def patch_delete_api_project(project_id):
    project = session.query(Project).filter_by(id=project_id).first()
    if g.user.id != project.user_id:
        return "Unauthorized access", 401
    if request.method == "PATCH":
        project.name = request.args.get("name", type=str) or project.name
        project.description = request.args.get("description", type=str) or project.description
        if project.type == "image_project":
            project.image_url = request.args.get("image_url", type=str) or project.image_url
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        elif project.type == "text_project":
            project.content = request.args.get("content", type=str) or project.content
            project.content_type = request.args.get("content_type", type=str) or project.content_type
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        elif project.type == "project":
            session.add(project)
            session.commit()
            return jsonify(project.serialize)
        else:
            return jsonify({"Something went horribly wrong": "type invalid or not provided"}), 500
    else:
        session.delete(project)
        session.commit()
        return jsonify(project.serialize)

if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
