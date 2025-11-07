from src.models.new_product_model import NewProductModel
from src.models.registered_product_model import RegisteredProductModel
from src.entities.product import Product

def to_product_entity(new_product_model: NewProductModel):
	return Product(
		name = new_product_model.name,
		price = new_product_model.price,
		categoryId = new_product_model.categoryId
	)

def to_registered_product_model(product_entity: Product):
	return RegisteredProductModel(
		id=product_entity.id,
		name=product_entity.name,
		price=product_entity.price,
		categoryId=product_entity.categoryId,
		category_name=product_entity.category.name
	)
