"""
Describes the database schema using SQLAlchemy.
"""
from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import create_engine
from passlib.apps import custom_app_context as pwd_context
from config import Config
import random, string
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

Base = declarative_base()
app_config = Config.development()
secret_key = "".join(random.choice(string.ascii_uppercase + string.digits) for x in xrange(32))


class Project(Base):
    """
    Represents a basic project. Nothing fancy here.
    """
    __tablename__ = "project"
    name = Column(String, nullable=False)
    description = Column(String)
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    course_id = Column(Integer, ForeignKey('course.id'))
    type = Column(String(50))

    __mapper_args__ = {
        "polymorphic_identity": "project",
        "polymorphic_on": type
    }

    @property
    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'user_id':self.user_id,
            'course_id':self.course_id,
            'type':self.type
        }

class ImageProject(Project):
    """
    Represents a project that is primarily an image.
    """
    __tablename__ = "image project"
    id = Column(Integer, ForeignKey("project.id"), primary_key=True)
    image_url = Column(String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity":"image_project",
    }

    @property
    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'user_id':self.user_id,
            'course_id': self.course_id,
            'type':self.type,
            'image_url':self.image_url
        }


class TextProject(Project):
    """
    Represents a project consisting mostly of text.
    """
    __tablename__ = "text project"
    id = Column(Integer, ForeignKey("project.id"), primary_key=True)
    content = Column(String, nullable=False)
    content_type = Column(Enum("code", "word", "plaintext", name="type"))

    __mapper_args__ = {
        "polymorphic_identity":"text_project",
    }

    @property
    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'user_id':self.user_id,
            'course_id':self.course_id,
            'type':self.type,
            'content':self.content,
            'content_type':self.content_type
        }

class User(Base):
    """
    Represents a user in the database.
    Passwords are encypted by passlib and stored as a hash.
    Very secure.
    """
    __tablename__ = "user"
    username = Column(String(85), nullable=False)
    password_hash = Column(String, nullable=False)
    projects = relationship(Project, cascade="save-update, merge, delete")
    id = Column(Integer, primary_key=True)

    def make_hash(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def check_hash(self, password):
        """Verifies a password
        :param password: the password to verify
        :return: boolean representing whether or not the verification succeeded.
        """
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(secret_key, expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(secret_key)
        try:
            data = s.loads(token)
        except SignatureExpired:
            print "Signature Expired"
            return None
        except BadSignature:
            print "Bad Signature"
            return None

        user_id = data['id']
        return user_id



class Course(Base):
    """
    Represents a grouping of projects, most likely for a class/course
    """
    __tablename__ = "course"
    name = Column(String, nullable=False)
    description = Column(String)
    id = Column(Integer, primary_key=True)
    projects = relationship(Project, cascade='save-update, merge, delete')

    @property
    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'projects': [i.serialize for i in self.projects]
        }

engine = create_engine(app_config.db_uri)
Base.metadata.create_all(engine)

