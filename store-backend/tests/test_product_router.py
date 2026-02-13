from decimal import Decimal
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from src.main import app
from src.dao.dependencies import get_db
from src.models.new_product_model import NewProductModel
from src.models.registered_product_model import RegisteredProductModel


@pytest.fixture
def mock_db():
    return MagicMock()


@pytest.fixture
def client(mock_db):
    def override_get_db():
        try:
            yield mock_db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


def test_create_product(client):
    """Unit Test for create_product endpoint."""
    expected_product = RegisteredProductModel(
        id=1,
        name="New Product",
        price=Decimal("29.99"),
        categoryId=1,
        category_name="Electronic",
    )

    async def mock_create_product(new_product_model: NewProductModel):
        return expected_product

    with patch("src.routers.product_router.ProductDAO") as MockProductDAO:
        MockProductDAO.return_value.create_product = AsyncMock(
            return_value=expected_product
        )

        response = client.post(
            "/Products",
            json={
                "name": "New Product",
                "price": "29.99",
                "categoryId": 1,
            },
        )

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "New Product"
    assert data["price"] == "29.99"
    assert data["categoryId"] == 1
    assert data["category_name"] == "Electronic"
