from sqlalchemy import Column, Integer

class BaseEntity():
	id = Column(Integer, primary_key=True, autoincrement=True)
	status = Column(Integer, nullable=False, default=1)
