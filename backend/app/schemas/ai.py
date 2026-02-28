from pydantic import BaseModel, Field


class SmartAssistRequest(BaseModel):
    title: str = Field(
        ..., description="O título do material. Ex: 'Matemática Financeira'"
    )
    resource_type: str = Field(..., description="O tipo do material. Ex: 'Vídeo'")


class SmartAssistResponse(BaseModel):
    description: str = Field(..., description="A descrição gerada pela IA")
    tags: str = Field(..., description="As 3 tags geradas, separadas por vírgula")
