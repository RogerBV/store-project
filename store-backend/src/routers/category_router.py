from fastapi import APIRouter, Depends
from src.models.registered_category_model import RegisteredCategoryModel
from src.models.new_category_model import NewCategoryModel
from src.dao.category_dao import CategoryDAO
from sqlalchemy.orm import Session
from src.dao.dependencies import get_db

category_router = APIRouter(
	prefix = '/Categories',
	tags = ['Categories']
)

@category_router.get('')
async def get_categories(db: Session = Depends(get_db)) -> list[RegisteredCategoryModel]:
	category_dao = CategoryDAO(db)
	return await category_dao.get_categories()

@category_router.put('')
async def create_category(new_category_model: NewCategoryModel, db: Session = Depends(get_db)) -> RegisteredCategoryModel:
  category_dao = CategoryDAO(db)
  return await category_dao.create_category(new_category_model)

@category_router.post('')
async def update_category(registered_category_model: RegisteredCategoryModel, db: Session = Depends(get_db)) -> RegisteredCategoryModel:
	category_dao = CategoryDAO(db)
	return await category_dao.update_category(registered_category_model)

@category_router.get('/{category_id}')
async def get_category(db: Session = Depends(get_db), category_id: int = 1) -> RegisteredCategoryModel:
    category_dao = CategoryDAO(db)
    return await category_dao.get_category_by_id(category_id)

@category_router.delete('/{category_id}')
async def delete_category(db: Session = Depends(get_db), category_id: int = 1) -> RegisteredCategoryModel:
    category_dao = CategoryDAO(db)
    return await category_dao.delete_category(category_id)
