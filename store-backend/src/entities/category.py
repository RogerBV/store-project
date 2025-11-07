from src.entities.common import BaseEntity
from sqlalchemy import Column, String
from src.entities.common.base import Base

class Category(Base, BaseEntity):
    __tablename__ = 'Category'
    name = Column(String(50), nullable= False)
