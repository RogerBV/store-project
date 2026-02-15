import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DATABASE_URI = f"postgresql+psycopg2://{user}:{password}@{host}/{database}"

# CORS: con allow_credentials=True no se puede usar "*"; hay que listar orígenes o usar regex.
# CORS_ORIGINS: lista explícita (opcional). Ejemplo: https://app.example.com,http://localhost:5173
# CORS_ORIGIN_REGEX: patrón regex para orígenes dinámicos (ej: *.cloudfront.net). Si no se define,
#   se usa un patrón por defecto que permite CloudFront y localhost para no hardcodear dominios.
_cors = os.getenv('CORS_ORIGINS', '').strip()
CORS_ORIGINS = [o.strip() for o in _cors.split(',') if o.strip()] if _cors else []

# Regex para orígenes permitidos sin hardcodear dominios específicos.
# Por defecto: CloudFront (*.cloudfront.net) y localhost/127.0.0.1 en cualquier puerto.
_cors_regex = os.getenv('CORS_ORIGIN_REGEX', '').strip()
CORS_ORIGIN_REGEX = _cors_regex if _cors_regex else (
	r'^https://[a-z0-9-]+\.cloudfront\.net$|'  # CloudFront
	r'^https?://(localhost|127\.0\.0\.1)(:\d+)?$'  # localhost / 127.0.0.1
)