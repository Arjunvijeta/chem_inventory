# Chemical Inventory Management System

A full-stack web application for managing chemical inventory with user authentication, chemical cataloging, location management, and order tracking.

## Features

- **Chemical Catalogue Management**: Add, view, edit, and delete chemical containers
- **Location Management**: Manage storage locations (building, room, shelf)
- **User Management**: Admin interface for managing users and departments
- **Order Tracking**: Track chemical requests and their status
- **Authentication**: Secure login system with JWT tokens
- **Search & Pagination**: Advanced search and pagination for all data tables

## Tech Stack

### Backend

- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **SQLite**: Database (can be easily changed to PostgreSQL/MySQL)
- **JWT**: Authentication tokens
- **Pydantic**: Data validation and serialization

### Frontend

- **React**: UI framework
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **React Icons**: Icon library

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the backend server:

```bash
python main.py
```

The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Chemical Catalogue

- `GET /chemical-catalogue/` - Get all chemicals
- `POST /chemical-catalogue/` - Create new chemical
- `GET /chemical-catalogue/{id}` - Get specific chemical
- `PUT /chemical-catalogue/{id}` - Update chemical
- `DELETE /chemical-catalogue/{id}` - Delete chemical

### Location

- `GET /location/` - Get all locations
- `POST /location/` - Create new location
- `GET /location/{id}` - Get specific location
- `PUT /location/{id}` - Update location
- `DELETE /location/{id}` - Delete location

### Users

- `GET /users/` - Get all users
- `POST /users/` - Create new user
- `GET /users/{id}` - Get specific user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Departments

- `GET /department/` - Get all departments
- `POST /department/` - Create new department
- `GET /department/{id}` - Get specific department
- `PUT /department/{id}` - Update department
- `DELETE /department/{id}` - Delete department

### Orders

- `GET /order/` - Get all orders
- `POST /order/` - Create new order
- `GET /order/{id}` - Get specific order
- `PUT /order/{id}` - Update order
- `DELETE /order/{id}` - Delete order

## Database Schema

The application uses the following main entities:

- **Chemical_catalogue**: Chemical containers with properties like name, CAS number, quantity, location
- **Location**: Storage locations with building, room, and shelf information
- **User**: System users with roles and department associations
- **Department**: Organizational departments
- **Order**: Chemical requests with status tracking

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Login with your credentials
4. Use the sidebar to access different features:
   - **Add chemical container**: Add new chemicals to inventory
   - **Location**: Manage storage locations
   - **Requested chemicals**: View and manage chemical requests
   - **Administrator**: Manage users and departments

## Development

### Adding New Features

1. Create new API endpoints in the backend routers
2. Add corresponding API functions in `frontend/src/services/api.js`
3. Create or update React components as needed
4. Update the main TableLayout component to include new features

### Database Changes

1. Update the models in `backend/models.py`
2. Update the schemas in `backend/schemas.py`
3. Create and run database migrations if needed

## Security

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- CORS is configured to allow only specific origins
- Input validation is handled by Pydantic schemas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

Test account:

User: string
Password: string
