from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.category_router import category_router
from src.routers.product_router import product_router
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from src.entities.common.config import CORS_ORIGINS, CORS_ORIGIN_REGEX

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=CORS_ORIGINS,
	allow_origin_regex=CORS_ORIGIN_REGEX,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
	expose_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
	return JSONResponse(
		status_code=422,
		content={"detail": exc.errors()}	
	)

app.include_router(category_router)
app.include_router(product_router)
