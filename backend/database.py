# database.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from models import Base
import os
from dotenv import load_dotenv
import logging

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Database configuration


DATABASE_URL = "sqlite:///./data.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()

def get_db():
    db = SessionLocal()
    logger.info(f"Database URL: {DATABASE_URL}")
    try:
        yield db
    finally:
        db.close()

# Only create tables if using SQLite or explicitly requested
Base.metadata.create_all(bind=engine)