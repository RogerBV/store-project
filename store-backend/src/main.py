from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.category_router import category_router
from src.routers.product_router import product_router
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.responses import Response


app = FastAPI()
origins = [
	"*"
]


app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
	return JSONResponse(
		status_code=422,
		content={"detail": exc.erros()}	
	)

app.include_router(category_router)
app.include_router(product_router)
