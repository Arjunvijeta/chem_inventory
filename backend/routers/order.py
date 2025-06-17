from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db
from auth.auth_handler import get_current_user

router = APIRouter(
    prefix="/order",
    tags=["Order"]
)

@router.post("/", response_model=schemas.OrderResponse)
def create_order(
    order: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Verify chemical exists
    chemical = db.query(models.Chemical_catalogue).filter(models.Chemical_catalogue.id == order.chemical_id).first()
    if not chemical:
        raise HTTPException(status_code=404, detail="Chemical not found")
    
    # Verify contact user exists
    contact = db.query(models.User).filter(models.User.id == order.contact).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact user not found")
    
    # Verify handler user exists
    handler = db.query(models.User).filter(models.User.id == order.handler).first()
    if not handler:
        raise HTTPException(status_code=404, detail="Handler user not found")
    
    db_order = models.Order(**order.model_dump())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=List[schemas.OrderResponse])
def get_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    orders = db.query(models.Order).offset(skip).limit(limit).all()
    return orders

@router.get("/{order_id}", response_model=schemas.OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/{order_id}", response_model=schemas.OrderResponse)
def update_order(
    order_id: int,
    order_update: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    
    update_data = order_update.model_dump(exclude_unset=True)
    
    # Verify chemical exists if being updated
    if "chemical_id" in update_data:
        chemical = db.query(models.Chemical_catalogue).filter(models.Chemical_catalogue.id == update_data["chemical_id"]).first()
        if not chemical:
            raise HTTPException(status_code=404, detail="Chemical not found")
    
    # Verify contact user exists if being updated
    if "requested_by" in update_data:
        contact = db.query(models.User).filter(models.User.id == update_data["requested_by"]).first()
        if not contact:
            raise HTTPException(status_code=404, detail="Contact user not found")
    
    # Verify handler user exists if being updated
    if "requested_to" in update_data:
        handler = db.query(models.User).filter(models.User.id == update_data["requested_to"]).first()
        if not handler:
            raise HTTPException(status_code=404, detail="Handler user not found")
    
    for field, value in update_data.items():
        setattr(db_order, field, value)
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    
    db.delete(db_order)
    db.commit()
    return None 