# schemas.py
from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

# User Schemas
class UserBase(BaseModel):
    name: str
    email: str
    password: str
    department: str
    role: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    edited_at: datetime

    class Config:
        from_attributes = True

class UserInDB(UserResponse):
    password: str

class PasswordResetSelf(BaseModel):
    old_password: str
    new_password: str

class PasswordResetByParent(BaseModel):
    user_id: int
    new_password: str

# Location Schemas
class LocationBase(BaseModel):
    location_building: str
    location_room: str
    location_self: str

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    location_building: Optional[str] = None
    location_room: Optional[str] = None
    location_self: Optional[str] = None

class LocationResponse(LocationBase):
    id: int
    created_by: int
    edited_by: int
    created_at: datetime
    edited_at: datetime

    class Config:
        from_attributes = True

# Chemical Catalogue Schemas
class ChemicalCatalogueBase(BaseModel):
    chemical_name: str
    cas: str
    barcode: str
    quantity: float
    unit: str
    supplier: str
    location_building: str
    location_room: str
    location_self: str
    purchase_date: date
    expiry_date: date
    comment: Optional[str] = None
    molwt: Optional[float] = None
    status: str = "active"

class ChemicalCatalogueCreate(ChemicalCatalogueBase):
    pass

class ChemicalCatalogueUpdate(BaseModel):
    chemical_name: Optional[str] = None
    cas: Optional[str] = None
    barcode: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    supplier: Optional[str] = None
    location_building: Optional[str] = None
    location_room: Optional[str] = None
    location_self: Optional[str] = None
    purchase_date: Optional[date] = None
    expiry_date: Optional[date] = None
    comment: Optional[str] = None
    molwt: Optional[float] = None
    status: Optional[str] = None

class ChemicalCatalogueResponse(ChemicalCatalogueBase):
    id: int
    created_by: int
    edited_by: int
    created_at: datetime
    edited_at: datetime

    class Config:
        from_attributes = True

# Order Schemas
class OrderBase(BaseModel):
    chemical_id: int
    chemical_name: str
    contact: int
    handler: int
    comment: Optional[str] = None
    status: str = "pending"

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    chemical_id: Optional[int] = None
    chemical_name: Optional[str] = None
    contact: Optional[int] = None
    handler: Optional[int] = None
    comment: Optional[str] = None
    status: Optional[str] = None

class OrderResponse(OrderBase):
    id: int
    created_at: datetime
    edited_at: datetime

    class Config:
        from_attributes = True