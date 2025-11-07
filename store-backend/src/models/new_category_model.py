from pydantic import BaseModel

class NewCategoryModel(BaseModel):
	name: str
