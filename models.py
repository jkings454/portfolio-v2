from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import create_engine
from passlib.apps import custom_app_context as pwd_context

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
