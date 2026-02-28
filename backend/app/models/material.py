from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base


class EducationalMaterialModel(Base):
    """Modelo de dados ORM para a tabela de materiais didáticos."""

    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    resource_type = Column(String, nullable=False)  # Ex: Vídeo, PDF, Link
    url = Column(String, nullable=False)
    tags = Column(String, nullable=True)
