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
    contact_person: bool = False
    role: str

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    department: Optional[str] = None
    contact_person: Optional[bool] = None
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

# Department Schemas
class DepartmentBase(BaseModel):
    department_name: str

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    department_name: Optional[str] = None

class DepartmentResponse(DepartmentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Location Schemas
class LocationBase(BaseModel):
    location_building: str
    location_room: str
    location_storage: str
    location_note: Optional[str] = None

class LocationCreate(LocationBase):
    pass

class LocationUpdate(BaseModel):
    location_building: Optional[str] = None
    location_room: Optional[str] = None
    location_storage: Optional[str] = None
    location_note: Optional[str] = None

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
    location_storage: str
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
    requested_by: str
    requested_to: str
    comment: Optional[str] = None
    status: str = "pending"

class OrderCreate(OrderBase):
    pass

class OrderUpdate(BaseModel):
    chemical_id: Optional[int] = None
    chemical_name: Optional[str] = None
    requested_by: Optional[str] = None
    requested_to: Optional[str] = None
    comment: Optional[str] = None
    status: Optional[str] = None

class OrderResponse(OrderBase):
    id: int
    created_at: datetime
    edited_at: datetime

    class Config:
        from_attributes = True