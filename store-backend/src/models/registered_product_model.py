from pydantic import BaseModel
from decimal import Decimal

class RegisteredProductModel(BaseModel):
	id: int
	name: str
	price: Decimal
	categoryId: int
	category_name: str
