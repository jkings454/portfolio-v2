"""
This is the entry point of the application.
"""
from flask import Flask, render_template, jsonify, request, url_for, g
from config import Config
from models import User, Project, ImageProject, TextProject, Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()
app = Flask(__name__)

app_config = Config().development()

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
def index():
    return render_template("index.html")


@app.route("/api/v1/projects")
def get_api_projects():
    projects = session.query(Project).all()
    return jsonify([i.serialize for i in projects])


@app.route("/api/v1/projects", methods=["POST"])
@auth.login_required
def post_api_project():
    return "Are these your arguments? %s" % request.args.get('key', '')


@app.route("/api/v1/projects/<int:project_id>")
def get_api_project(project_id):
    project = session.query(Project).filter_by(id=project_id).one()
    return jsonify(project.serialize)


if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
