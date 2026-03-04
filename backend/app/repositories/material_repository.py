from sqlalchemy.orm import Session
from sqlalchemy import or_
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

    def get_paginated(
        self,
        skip: int = 0,
        limit: int = 10,
        search: str = None,
        resource_type: str = None,
    ) -> tuple[list[EducationalMaterialModel], int]:
        """
        Busca itens paginados com suporte a filtros dinâmicos.
        Utiliza programação defensiva para aplicar os filtros de forma incremental.
        """
        query = self.db.query(EducationalMaterialModel)

        # Filtro de Busca Global (Título ou Tags) ignorando Case Sensitive (ilike)
        if search:
            search_format = f"%{search}%"
            query = query.filter(
                or_(
                    EducationalMaterialModel.title.ilike(search_format),
                    EducationalMaterialModel.tags.ilike(search_format),
                )
            )

        # Filtro exato por tipo de recurso
        if resource_type:
            query = query.filter(
                EducationalMaterialModel.resource_type == resource_type
            )

        # Conta o total APÓS aplicar os filtros, para a paginação não quebrar
        total = query.count()
        items = query.offset(skip).limit(limit).all()

        return items, total

    def get_metrics(self) -> dict:
        """
        Calcula as estatísticas gerais do repositório educacional.
        Realiza as contagens diretamente no motor do banco de dados para maior performance.
        """
        total = self.db.query(EducationalMaterialModel).count()

        videos = (
            self.db.query(EducationalMaterialModel)
            .filter(EducationalMaterialModel.resource_type == "Vídeo")
            .count()
        )

        pdfs = (
            self.db.query(EducationalMaterialModel)
            .filter(EducationalMaterialModel.resource_type == "PDF")
            .count()
        )

        links = (
            self.db.query(EducationalMaterialModel)
            .filter(EducationalMaterialModel.resource_type == "Link")
            .count()
        )

        return {
            "total_materials": total,
            "video_count": videos,
            "pdf_count": pdfs,
            "link_count": links,
        }

    def get_by_id(self, material_id: int) -> EducationalMaterialModel | None:
        return (
            self.db.query(EducationalMaterialModel)
            .filter(EducationalMaterialModel.id == material_id)
            .first()
        )

    def update(
        self, db_material: EducationalMaterialModel, material_data: MaterialUpdate
    ) -> EducationalMaterialModel:
        for key, value in material_data.model_dump(exclude_unset=True).items():
            setattr(db_material, key, value)
        self.db.commit()
        self.db.refresh(db_material)
        return db_material

    def delete(self, db_material: EducationalMaterialModel) -> None:
        self.db.delete(db_material)
        self.db.commit()
