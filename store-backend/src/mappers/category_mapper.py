from src.models.new_category_model import NewCategoryModel
from src.models.registered_category_model import RegisteredCategoryModel
from src.entities.category import Category

def to_category_entity(new_category_model: NewCategoryModel):
	return Category(
		name = new_category_model.name
	)

def to_registered_category_model(category_entity: Category):
	return RegisteredCategoryModel(
		id = category_entity.id,
		name = category_entity.name
	)

def from_model_to_category_entity(registered_category_model: RegisteredCategoryModel):
    return Category(
		id=registered_category_model.id,
		name=registered_category_model.name
	)