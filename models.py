from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import create_engine
from passlib.apps import custom_app_context as pwd_context
from app import app_config

Base = declarative_base()


class User(Base):
    """
    Represents a user in the database.
    Passwords are encypted by passlib and stored as a hash.
    Very secure.
    """
    __tablename__ = "user"
    username = Column(String(85), nullable=False)
    password_hash = Column(String, nullable=False)
    id = Column(Integer, primary_key=True)

    def make_hash(self, password):
        """
        Hashes a password in order to store it more securely.

        Keyword arguments:
        password -- The RAW password that you wish to hash.
        """
        self.password_hash = pwd_context.encrypt(password)

    def check_hash(self, password):
        """Verifies a password"""
        return pwd_context.verify(password, self.password_hash)

class Project(Base):
    __tablename__ = "project"
    name = Column(String, nullable=False)
    description = Column(String)
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)
    type = Column(String(50))

    __mapper_args__ = {
        "polymorphic_identity":"project",
        "polymorphic_on":type
    }

class ImageProject(Project):
    __tablename__ = "image project"
    id = Column(Integer, ForeignKey("project.id"), primary_key=True)
    image_url = Column(String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity":"image project",
    }


class TextProject(Project):
    __tablename__ = "text project"
    id = Column(Integer, ForeignKey("project.id"), primary_key=True)
    content = Column(String, nullable=False)
    content_type = Column(Enum("code", "word", "plaintext", name="type"))

    __mapper_args__ = {
        "polymorphic_identity":"text project",
    }


engine = create_engine(app_config.db_uri)
Base.metadata.create_all(engine)

