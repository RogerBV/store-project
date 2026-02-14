import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DATABASE_URI = f"postgresql+psycopg2://{user}:{password}@{host}/{database}"

# CORS: con allow_credentials=True no se puede usar "*"; hay que listar orígenes.
# Ejemplo: CORS_ORIGINS=https://dqzmilo8qt1u5.cloudfront.net,http://localhost:5173
_cors = os.getenv('CORS_ORIGINS', '').strip()
CORS_ORIGINS = [o.strip() for o in _cors.split(',') if o.strip()] if _cors else [
	'https://dqzmilo8qt1u5.cloudfront.net',  # frontend producción
	'http://localhost:5173',
	'http://localhost:3000',
	'http://127.0.0.1:5173',
	'http://127.0.0.1:3000',
]