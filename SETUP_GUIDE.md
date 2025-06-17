# Chemical Inventory Setup Guide

## Import Structure Explanation

This project uses **relative imports** throughout the backend to ensure consistency and Docker compatibility. Here's how the import structure works:

### Directory Structure

```
chem_inventory/
├── backend/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth/
│   │   ├── __init__.py
│   │   └── auth_handler.py
│   └── routers/
│       ├── __init__.py
│       ├── auth.py
│       ├── user.py
│       ├── chemical_catalogue.py
│       ├── location.py
│       ├── department.py
│       └── order.py
└── frontend/
    └── ...
```

### Import Patterns

#### 1. **Relative Imports in Routers** (e.g., `routers/chemical_catalogue.py`)

```python
from .. import models          # Import from parent directory
from .. import schemas         # Import from parent directory
from ..database import get_db  # Import specific function from parent
from ..auth.auth_handler import get_current_user  # Import from sibling package
```

#### 2. **Relative Imports in Auth Handler** (`auth/auth_handler.py`)

```python
from ..database import get_db  # Import from parent directory
from ..schemas import TokenData # Import from parent directory
from ..models import User      # Import from parent directory
```

#### 3. **Direct Imports in Main** (`main.py`)

```python
from routers import auth, user, chemical_catalogue, location, order, department
```

## Running the Application

### Option 1: Using the Run Script (Recommended)

From the project root directory:

```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt

# Go back to root and run the backend
cd ..
python run_backend.py
```

### Option 2: Running from Backend Directory

```bash
cd backend
python main.py
```

### Option 3: Using uvicorn directly

```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Why This Import Structure?

### 1. **Docker Compatibility**

When containerizing the application, relative imports ensure that the code works regardless of where the container is run.

### 2. **Consistency**

All modules use the same import pattern, making the codebase easier to understand and maintain.

### 3. **Modularity**

Each router and component can be moved or refactored without breaking import paths.

### 4. **No Path Confusion**

You don't need to worry about whether to use `from models import User` or `from backend.models import User`.

## Common Issues and Solutions

### Issue: "No module named 'backend'"

**Solution**: Use relative imports (`from .. import models`) instead of absolute imports (`from backend import models`).

### Issue: "ImportError: attempted relative import with no known parent package"

**Solution**: Make sure you have `__init__.py` files in all directories and run from the correct directory.

### Issue: "ModuleNotFoundError"

**Solution**: Use the `run_backend.py` script from the project root, or ensure you're in the correct directory.

## Development Workflow

1. **Start Backend**: `python run_backend.py` (from project root)
2. **Start Frontend**: `cd frontend && npm start`
3. **Access API Docs**: http://127.0.0.1:8000/docs
4. **Access Frontend**: http://localhost:3000

## Docker Preparation

This import structure makes it easy to Dockerize:

```dockerfile
# Example Dockerfile structure
FROM python:3.9
WORKDIR /app
COPY backend/ ./backend/
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "run_backend.py"]
```

## Testing the Setup

1. **Backend Test**: Visit http://127.0.0.1:8000/docs
2. **Frontend Test**: Visit http://localhost:3000
3. **API Test**: Use the test script: `node test_connection.js`

## Troubleshooting

### If you get import errors:

1. Make sure all directories have `__init__.py` files
2. Use the `run_backend.py` script from the project root
3. Check that you're not mixing absolute and relative imports

### If the frontend can't connect to backend:

1. Check that the backend is running on port 8000
2. Verify CORS settings in `main.py`
3. Check the API_BASE_URL in `frontend/src/services/api.js`

### If you need to add new modules:

1. Create the module in the appropriate directory
2. Use relative imports consistently
3. Add `__init__.py` files if creating new directories
4. Update the main.py file to include new routers
