from pydantic import BaseModel

class RegisteredCategoryModel(BaseModel):
	id: int
	name: str
