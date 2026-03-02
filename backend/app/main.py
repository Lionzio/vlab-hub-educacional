import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Imports otimizados e limpos (Domain-Driven)
from app.core import engine
from app.models import EducationalMaterialModel
from app.controllers import material_router, ai_router

# Criação das tabelas no banco de dados instanciando a metadata
EducationalMaterialModel.metadata.create_all(bind=engine)

# Configuração global de observabilidade para acompanharmos os logs no Render
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="V-Lab Hub Educacional",
    description="API arquitetada com Clean Architecture e integração com Gemini IA.",
    version="2.0.0",
)

# ---------------------------------------------------------
# Configuração de CORS (Cross-Origin Resource Sharing)
# Essencial para permitir que o Frontend (ex: hospedado na Vercel)
# consiga fazer requisições HTTP para esta API (hospedada no Render).
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    # Na vida real de uma empresa, trocaríamos o "*" (tudo) pela URL exata da Vercel.
    # Ex: allow_origins=["https://meu-app.vercel.app"]
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=[
        "*"
    ],  # Permite envio de cabeçalhos customizados (ex: Tokens de Auth)
)

# Registro centralizado dos roteadores (Modularização)
app.include_router(material_router)
app.include_router(ai_router)


@app.get("/health", tags=["Observabilidade"])
def health_check():
    """
    Endpoint de verificação de integridade do sistema.
    Usado por serviços de nuvem (como o Render) para saber se a API subiu corretamente.
    """
    return {
        "status": "ok",
        "message": "API rodando com Clean Architecture!",
        "environment": "production",
    }
