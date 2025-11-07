from sqlalchemy.orm import Session
from src.entities.category import Category
from src.models.registered_category_model import RegisteredCategoryModel
from src.models.new_category_model import NewCategoryModel
from src.mappers.category_mapper import to_registered_category_model, to_category_entity, from_model_to_category_entity

class CategoryDAO():

	def __init__(self, db: Session):
		self.db = db
	
	async def get_categories(self) -> list[RegisteredCategoryModel]:
		categories = self.db.query(Category).filter(Category.status == 1).order_by(Category.id).all()
		return [to_registered_category_model(obj) for obj in categories]

	async def get_category_by_id(self, category_id: int) -> list[RegisteredCategoryModel]:
		category = self.db.query(Category).get(category_id)
		return to_registered_category_model(category)

	async def create_category(self, new_category_model: NewCategoryModel) -> RegisteredCategoryModel:
		new_category_entity = to_category_entity(new_category_model)
		self.db.add(new_category_entity)
		self.db.commit()
		self.db.refresh(new_category_entity)
		return to_registered_category_model(new_category_entity)

	async def update_category(self, registered_category_model: RegisteredCategoryModel) -> RegisteredCategoryModel:
		category_entity = self.db.query(Category).get(registered_category_model.id)
		category_entity.name = registered_category_model.name
		self.db.commit()
		self.db.refresh(category_entity)
		return to_registered_category_model(category_entity)

	async def delete_category(self, category_id: int) -> RegisteredCategoryModel:
		category_entity = self.db.query(Category).get(category_id)
		category_entity.status = 0
		self.db.commit()
		self.db.refresh(category_entity)
		return to_registered_category_model(category_entity)
