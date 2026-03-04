from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    email: str = Field(..., description="Email do usuário")
    password: str = Field(..., description="Senha em texto plano")
    role: str = Field("aluno", description="Perfil: 'aluno' ou 'conteudista'")

class UserResponse(BaseModel):
    id: int
    email: str
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str