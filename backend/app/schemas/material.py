from pydantic import BaseModel, Field
from typing import Optional

class ResourceBase(BaseModel):
    title: str = Field(..., description="O título do recurso educacional")
    description: Optional[str] = Field(None, description="A descrição do recurso")
    resource_type: str = Field(..., description="Tipo: Vídeo, PDF, ou Link")
    url: str = Field(..., description="O link de acesso ao recurso")
    tags: Optional[str] = Field(None, description="Tags separadas por vírgula")

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(ResourceBase):
    pass

class ResourceResponse(ResourceBase):
    id: int

    class Config:
        from_attributes = True