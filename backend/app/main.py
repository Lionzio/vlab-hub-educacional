import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Imports otimizados e limpos (Domain-Driven)
from app.core.database import engine
from app.models.material import EducationalMaterialModel
from app.models.user import UserModel
from app.controllers.material_controller import router as material_router
from app.controllers.ai_controller import router as ai_router
from app.controllers.auth_controller import router as auth_router

# Criação das tabelas no banco de dados instanciando a metadata.
# Em um cenário de produção escalável, usaríamos Alembic para migrações.
EducationalMaterialModel.metadata.create_all(bind=engine)
UserModel.metadata.create_all(bind=engine)

# Configuração global de observabilidade para acompanharmos os logs no Render
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="V-Lab Hub Educacional",
    description="API arquitetada com Clean Architecture, integração com Gemini e JWT Auth.",
    version="3.0.0",
)

# ---------------------------------------------------------
# Configuração de CORS (Cross-Origin Resource Sharing)
# Essencial para permitir que o Frontend (ex: Vercel) comunique com a API
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção estrita, substituir pela URL do Frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Permite envio do cabeçalho Authorization (Bearer Token)
)

# Registro centralizado dos roteadores (Modularização)
app.include_router(auth_router)
app.include_router(material_router)
app.include_router(ai_router)


@app.get("/health", tags=["Observabilidade"])
def health_check():
    """
    Endpoint de verificação de integridade do sistema.
    Usado por serviços de nuvem para saber se a API subiu corretamente.
    """
    return {
        "status": "ok",
        "message": "API blindada com JWT e Clean Architecture!",
        "environment": "production",
    }