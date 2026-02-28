import logging
from fastapi import FastAPI

# Imports otimizados e limpos (Domain-Driven)
from app.core import engine
from app.models import EducationalMaterialModel
from app.controllers import material_router, ai_router

# Criação das tabelas no banco de dados
EducationalMaterialModel.metadata.create_all(bind=engine)

# Configuração global de observabilidade
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="V-Lab Hub Educacional",
    description="API arquitetada com Clean Architecture e integração com Gemini IA.",
    version="2.0.0",
)

# Registro centralizado dos roteadores
app.include_router(material_router)
app.include_router(ai_router)

@app.get("/health", tags=["Observabilidade"])
def health_check():
    """Endpoint de verificação de integridade do sistema."""
    return {
        "status": "ok", 
        "message": "API rodando com Clean Architecture!", 
        "environment": "development"
    }