# Chemical Inventory Management System

A modern web application for managing chemical inventory, built with React and FastAPI. This system allows users to search for chemicals, view their properties and quantities, and request chemicals through an intuitive user interface.

## Features

- 🔍 Chemical search functionality
- 📊 Chemical property and quantity tracking
- 📝 Chemical request management
- 🔐 User authentication and authorization
- 🎨 Modern, responsive UI built with React and Tailwind CSS
- 🧪 Chemical structure visualization using Ketcher
- 📱 Mobile-friendly design

## Tech Stack

### Frontend

- React 18
- React Router DOM
- Tailwind CSS
- Ketcher (for chemical structure visualization)
- React Icons
- Testing libraries (Jest, React Testing Library)

### Backend

- FastAPI
- SQLAlchemy (ORM)
- PostgreSQL
- JWT Authentication
- Alembic (Database migrations)
- Pydantic (Data validation)

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- PostgreSQL
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with the following variables:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/chem_inventory
   SECRET_KEY=your-secret-key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. Run database migrations:

   ```bash
   alembic upgrade head
   ```

6. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```

The backend server will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:

   ```
   REACT_APP_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The frontend application will run on `http://localhost:3000`

## API Documentation

Once the backend server is running, you can access the interactive API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Development

### Backend Development

- The backend follows a modular structure with separate routers for different functionalities
- Database models are defined in `models.py`
- API schemas are defined in `schemas.py`
- Authentication logic is handled in the `auth` directory

### Frontend Development

- The frontend is built using React with a component-based architecture
- Styling is done using Tailwind CSS
- Chemical structure visualization is implemented using Ketcher
- Routing is handled using React Router

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
