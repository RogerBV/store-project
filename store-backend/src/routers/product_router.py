from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.models.registered_product_model import RegisteredProductModel
from src.models.new_product_model import NewProductModel
from src.dao.dependencies import get_db
from src.dao.product_dao import ProductDAO


product_router = APIRouter(
	prefix = '/Products',
	tags = ['Products']
)

@product_router.get('')
async def get_products(db: Session = Depends(get_db)) -> list[RegisteredProductModel]:
	product_dao = ProductDAO(db)
	return await product_dao.get_products()

@product_router.get('/{product_id}')
async def get_product(db: Session = Depends(get_db), product_id: int = 1) -> list[RegisteredProductModel]:
	product_dao = ProductDAO(db)
	return await product_dao.get_product(product_id)

@product_router.put('')
async def create_product(new_product_model: NewProductModel, db: Session = Depends(get_db)) -> RegisteredProductModel:
	product_dao = ProductDAO(db)
	return await product_dao.create_product(new_product_model)


@product_router.post('')
async def update_product(registered_product_model: RegisteredProductModel, db: Session = Depends(get_db)) -> RegisteredProductModel:
    product_dao = ProductDAO(db)
    return await product_dao.update_product(registered_product_model)
