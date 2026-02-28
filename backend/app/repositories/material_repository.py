from sqlalchemy.orm import Session
from app.models.material import EducationalMaterialModel
from app.schemas.material import MaterialCreate, MaterialUpdate

class MaterialRepository:
    """Isola a lógica de acesso a dados (banco) do resto da aplicação."""
    
    def __init__(self, db: Session):
        self.db = db

    def create(self, material_data: MaterialCreate) -> EducationalMaterialModel:
        db_material = EducationalMaterialModel(**material_data.model_dump())
        self.db.add(db_material)
        self.db.commit()
        self.db.refresh(db_material)
        return db_material

    def get_all(self, skip: int = 0, limit: int = 10) -> list[EducationalMaterialModel]:
        return self.db.query(EducationalMaterialModel).offset(skip).limit(limit).all()

    def get_by_id(self, material_id: int) -> EducationalMaterialModel | None:
        return self.db.query(EducationalMaterialModel).filter(EducationalMaterialModel.id == material_id).first()

    def update(self, db_material: EducationalMaterialModel, material_data: MaterialUpdate) -> EducationalMaterialModel:
        for key, value in material_data.model_dump(exclude_unset=True).items():
            setattr(db_material, key, value)
        self.db.commit()
        self.db.refresh(db_material)
        return db_material

    def delete(self, db_material: EducationalMaterialModel) -> None:
        self.db.delete(db_material)
        self.db.commit()