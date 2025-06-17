# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
    
# Import our new routers
from routers import auth, user, chemical_catalogue, location, order, department

app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",  # Add React default port
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include our new routers
app.include_router(auth.router, prefix="/auth")
app.include_router(user.router)
app.include_router(chemical_catalogue.router)
app.include_router(location.router)
app.include_router(order.router)
app.include_router(department.router)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
