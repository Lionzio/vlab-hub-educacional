from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class MaterialBase(BaseModel):
    """Schema base para validação de entrada e saída."""
    title: str = Field(..., description="O título do material educacional")
    description: Optional[str] = Field(None, description="A descrição do material")
    resource_type: str = Field(..., description="Tipo: Vídeo, PDF, ou Link")
    url: str = Field(..., description="O link de acesso ao material")
    tags: Optional[str] = Field(None, description="Tags separadas por vírgula")

class MaterialCreate(MaterialBase):
    """Schema usado exclusivamente na rota de POST (Criação)."""
    pass

class MaterialUpdate(MaterialBase):
    """Schema usado exclusivamente na rota de PUT (Atualização)."""
    pass

class MaterialResponse(MaterialBase):
    """Schema usado para retornar os dados do banco para o Frontend."""
    id: int

    # Boa prática Pydantic V2: Substitui a antiga 'class Config' pelo ConfigDict
    model_config = ConfigDict(from_attributes=True)