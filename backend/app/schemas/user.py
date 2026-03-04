from pydantic import BaseModel, Field, ConfigDict


class UserCreate(BaseModel):
    email: str = Field(..., description="Email do usuário")
    password: str = Field(..., description="Senha em texto plano")
    role: str = Field("aluno", description="Perfil: 'aluno' ou 'conteudista'")


class UserResponse(BaseModel):
    id: int
    email: str
    role: str

    # 🛡️ Correção Sênior: Sintaxe nativa do Pydantic V2 para converter objetos do Banco (ORM) para JSON
    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
