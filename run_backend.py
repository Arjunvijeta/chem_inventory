#!/usr/bin/env python3
"""
Script to run the backend server from the project root directory.
This ensures proper Python path handling for relative imports.
"""

import sys
import os

# Change to backend directory to make it the top-level package
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
os.chdir(backend_path)

# Add the current directory to Python path
sys.path.insert(0, os.getcwd())

# Import and run the FastAPI app
from main import app
import uvicorn

if __name__ == "__main__":
    print("Starting Chemical Inventory Backend Server...")
    print("Server will be available at: http://127.0.0.1:8000")
    print("API documentation: http://127.0.0.1:8000/docs")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True) 