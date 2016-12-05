from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine import create_engine
from passlib import pwd

Base = declarative_base()

class User(Base):
    __tablename__ = "user"