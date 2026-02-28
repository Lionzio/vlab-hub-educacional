from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

# Imports otimizados focados apenas nos contratos e abstrações necessárias
from app.core import get_db
from app.schemas import MaterialCreate, MaterialUpdate, MaterialResponse
from app.repositories import MaterialRepository

router = APIRouter(prefix="/materials", tags=["Materials"])


@router.post("/", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    return repo.create(material)


@router.get("/", response_model=List[MaterialResponse])
def list_materials(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    return repo.get_all(skip, limit)


@router.get("/{material_id}", response_model=MaterialResponse)
def get_material(material_id: int, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    db_material = repo.get_by_id(material_id)
    if not db_material:
        raise HTTPException(status_code=404, detail="Material não encontrado.")
    return db_material


@router.put("/{material_id}", response_model=MaterialResponse)
def update_material(
    material_id: int, material: MaterialUpdate, db: Session = Depends(get_db)
):
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
