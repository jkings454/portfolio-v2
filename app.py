"""
This is the entry point of the application.
"""
from flask import Flask, render_template, jsonify, request, url_for
from config import Config
from models import User, Project, ImageProject, TextProject, Base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

app = Flask(__name__)

app_config = Config().development()

engine = create_engine(app_config.db_uri)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1/projects")
def get_api_projects():
    projects = session.query(Project).all()
    return jsonify([i.serialize for i in projects])

@app.route("/api/v1/projects", methods=["POST"])
def post_api_project():
    return "Are these your arguments? %s" % request.args.get('key', '')

@app.route("/api/v1/projects/<int:project_id>")
def get_api_project(project_id):
    project = session.query(Project).filter_by(id=project_id).one()
    return jsonify(project.serialize)

if __name__ == "__main__":
    app.run(debug=app_config.debug, host=app_config.host, port=app_config.port)
