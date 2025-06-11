# models.py
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Table, BigInteger, Float, Date
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

Base = declarative_base()


   

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    department = Column(String)
    role = Column(String)
    created_at = Column(DateTime, server_default=func.now())
    edited_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    # locations = relationship("Location", back_populates="created_by_user")
    # chemicals = relationship("Chemical_catalogue", back_populates="created_by_user")
    # orders = relationship("Order", back_populates="contact_user")

class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    location_building = Column(String, index=True)
    location_room = Column(String, index=True)
    location_self = Column(String, index=True)
    created_by = Column(Integer, ForeignKey("users.id"))
    edited_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, server_default=func.now())
    edited_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    # created_by_user = relationship("User", foreign_keys=[created_by], back_populates="locations")
    # edited_by_user = relationship("User", foreign_keys=[edited_by])
    # chemicals = relationship("Chemical_catalogue", back_populates="location")

class Chemical_catalogue(Base):
    __tablename__ = "chemical_catalogues"
    id = Column(Integer, primary_key=True, index=True)
    chemical_name = Column(String, index=True)
    cas = Column(String, index=True)
    barcode = Column(String, unique=True, index=True)
    quantity = Column(Float)
    unit = Column(String)
    supplier = Column(String)
    location_building = Column(String, index=True)
    location_room = Column(String, index=True)
    location_self = Column(String, index=True)
    purchase_date = Column(Date)
    expiry_date = Column(Date)
    comment = Column(String, nullable=True)
    molwt = Column(Float, nullable=True)
    status = Column(String, default="active")
    created_by = Column(Integer, ForeignKey("users.id"))
    edited_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, server_default=func.now())
    edited_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    # Relationships
    # created_by_user = relationship("User", foreign_keys=[created_by], back_populates="chemicals")
    # edited_by_user = relationship("User", foreign_keys=[edited_by])
    # location = relationship("Location", back_populates="chemicals", 
    #                       primaryjoin="and_(Chemical_catalogue.location_building==Location.location_building, "
    #                                  "Chemical_catalogue.location_room==Location.location_room, "
    #                                  "Chemical_catalogue.location_self==Location.location_self)")
    # orders = relationship("Order", back_populates="chemical")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    chemical_id = Column(Integer, ForeignKey("chemical_catalogues.id"))
    chemical_name = Column(String)
    contact = Column(Integer, ForeignKey("users.id"))
    handler = Column(Integer, ForeignKey("users.id"))
    comment = Column(String, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, server_default=func.now())
    edited_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # Relationships
    # chemical = relationship("Chemical_catalogue")
    # contact_user = relationship("User", foreign_keys=[contact], back_populates="orders")
    # handler_user = relationship("User", foreign_keys=[handler])


    __tablename__ = 'commodities'
    
    commodity_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), unique=True, nullable=False)
    description = Column(String(255), nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    edited_at = Column(DateTime, server_default=func.now(), onupdate=func.now())