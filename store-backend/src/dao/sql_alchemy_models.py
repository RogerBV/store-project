from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.entities.category import Category
from src.entities.product import Product
from src.entities.common.config import DATABASE_URI

import psycopg2

engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(bind=engine)