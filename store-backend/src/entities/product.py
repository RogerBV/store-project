from src.entities.common import BaseEntity
from src.entities.common.base import Base
from sqlalchemy import Column, DECIMAL, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Product(Base, BaseEntity):
    __tablename__ = 'Product'
    name = Column(String(255), nullable=False)
    price = Column(DECIMAL(precision=10, scale=2))
    categoryId = Column(Integer, ForeignKey('Category.id'))
    category = relationship('Category', backref='products', lazy='joined')