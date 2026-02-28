from sqlalchemy import Column, Integer, String, Text
from app.core.database import Base

class ResourceModel(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    resource_type = Column(String, nullable=False) # Ex: Vídeo, PDF, Link
    url = Column(String, nullable=False)
    tags = Column(String, nullable=True)