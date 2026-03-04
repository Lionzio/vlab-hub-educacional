import math
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

# Imports otimizados focados apenas nos contratos e abstrações necessárias
from app.core.database import get_db
from app.schemas.material import (
    MaterialCreate,
    MaterialUpdate,
    MaterialResponse,
    PaginatedMaterialResponse,
)
from app.repositories.material_repository import MaterialRepository

router = APIRouter(prefix="/materials", tags=["Materials"])


@router.post("/", response_model=MaterialResponse, status_code=status.HTTP_201_CREATED)
def create_material(material: MaterialCreate, db: Session = Depends(get_db)):
    repo = MaterialRepository(db)
    return repo.create(material)


@router.get("/", response_model=PaginatedMaterialResponse)
def list_materials(
    page: int = Query(1, ge=1, description="Número da página"),
    size: int = Query(5, ge=1, le=100, description="Itens por página"),
    db: Session = Depends(get_db),
):
    """Lista os materiais de forma paginada para não sobrecarregar o frontend."""
    repo = MaterialRepository(db)
    skip = (page - 1) * size

    items, total = repo.get_paginated(skip=skip, limit=size)
    total_pages = math.ceil(total / size) if total > 0 else 1

    return PaginatedMaterialResponse(
        items=items, total=total, page=page, size=size, total_pages=total_pages
    )


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
