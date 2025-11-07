from sqlalchemy.orm import Session
from src.entities.category import Category
from src.entities.product import Product
from src.models.new_product_model import NewProductModel
from src.models.registered_product_model import RegisteredProductModel
from src.mappers.product_mapper import to_registered_product_model, to_product_entity

class ProductDAO():
	def __init__(self, db: Session):
		self.db = db
	
	async def get_products(self) -> list[RegisteredProductModel]:
		products = self.db.query(Product).join(Category, Product.categoryId == Category.id).filter(Product.status==1).order_by(Product.id).all()
		return [to_registered_product_model(obj) for obj in products]

	async def get_product(self, product_id: int) -> list[RegisteredProductModel]:
		products = self.db.query(Product).join(Category, Product.categoryId == Category.id).filter(Product.id==product_id).order_by(Product.id).all()
		return [to_registered_product_model(obj) for obj in products]

	async def create_product(self, new_product_model: NewProductModel):
		new_product_entity = to_product_entity(new_product_model)
		self.db.add(new_product_entity)
		self.db.commit()
		self.db.refresh(new_product_entity)
		return to_registered_product_model(new_product_entity)

	async def update_product(self, registered_product_model: RegisteredProductModel) -> RegisteredProductModel:
		product_entity = self.db.query(Product).get(registered_product_model.id)
		product_entity.name = registered_product_model.name
		product_entity.price = registered_product_model.price
		product_entity.categoryId = registered_product_model.categoryId
		self.db.commit()
		self.db.refresh(product_entity)
		return to_registered_product_model(product_entity)
