from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db
from auth.auth_handler import get_current_user

router = APIRouter(
    prefix="/chemical-catalogue",
    tags=["Chemical Catalogue"]
)

@router.post("/", response_model=schemas.ChemicalCatalogueResponse)
def create_chemical(
    chemical: schemas.ChemicalCatalogueCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_chemical = models.Chemical_catalogue(
        **chemical.model_dump(),
        created_by=current_user.id,
        edited_by=current_user.id
    )
    db.add(db_chemical)
    db.commit()
    db.refresh(db_chemical)
    return db_chemical

@router.get("/", response_model=List[schemas.ChemicalCatalogueResponse])
def get_chemicals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    chemicals = db.query(models.Chemical_catalogue).offset(skip).limit(limit).all()
    return chemicals

@router.get("/{chemical_id}", response_model=schemas.ChemicalCatalogueResponse)
def get_chemical(
    chemical_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    chemical = db.query(models.Chemical_catalogue).filter(models.Chemical_catalogue.id == chemical_id).first()
    if chemical is None:
        raise HTTPException(status_code=404, detail="Chemical not found")
    return chemical

@router.put("/{chemical_id}", response_model=schemas.ChemicalCatalogueResponse)
def update_chemical(
    chemical_id: int,
    chemical_update: schemas.ChemicalCatalogueUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_chemical = db.query(models.Chemical_catalogue).filter(models.Chemical_catalogue.id == chemical_id).first()
    if db_chemical is None:
        raise HTTPException(status_code=404, detail="Chemical not found")
    
    update_data = chemical_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_chemical, field, value)
    
    db_chemical.edited_by = current_user.id
    db.commit()
    db.refresh(db_chemical)
    return db_chemical

@router.delete("/{chemical_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_chemical(
    chemical_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_chemical = db.query(models.Chemical_catalogue).filter(models.Chemical_catalogue.id == chemical_id).first()
    if db_chemical is None:
        raise HTTPException(status_code=404, detail="Chemical not found")
    
    db.delete(db_chemical)
    db.commit()
    return None 