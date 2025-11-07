import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

user = os.getenv('DB_USER')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')

DATABASE_URI = f"postgresql+psycopg2://{user}:{password}@{host}/{database}"