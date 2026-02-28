from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.schemas import material as schemas
from app.repositories.material_repository import MaterialRepository

# Criamos um roteador específico para a entidade Material
router = APIRouter(prefix="/materials", tags=["Materials"])

@router.post("/", response_model=schemas.MaterialResponse, status_code=status.HTTP_201_CREATED)
def create_material(material: schemas.MaterialCreate, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    return repo.create(material)

@router.get("/", response_model=List[schemas.MaterialResponse])
def list_materials(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    return repo.get_all(skip, limit)

@router.get("/{material_id}", response_model=schemas.MaterialResponse)
def get_material(material_id: int, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    db_material = repo.get_by_id(material_id)
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado.")
    return db_material

@router.put("/{material_id}", response_model=schemas.MaterialResponse)
def update_material(material_id: int, material: schemas.MaterialUpdate, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    db_material = repo.get_by_id(material_id)
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado.")
    return repo.update(db_material, material)

@router.delete("/{material_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_material(material_id: int, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    db_material = repo.get_by_id(material_id)
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado.")
    repo.delete(db_material)