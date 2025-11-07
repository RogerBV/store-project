from pydantic import BaseModel
from decimal import Decimal

class NewProductModel(BaseModel):
	name: str
	price: Decimal
	categoryId: int
