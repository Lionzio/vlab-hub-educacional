from fastapi import FastAPI
import logging

# Importações dos nossos módulos
from app.core.database import engine
from app.models import material as material_model
from app.controllers import material_controller, ai_controller

# Cria as tabelas no banco de dados
material_model.Base.metadata.create_all(bind=engine)

# Configuração global do Logger
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="Hub Inteligente de Recursos Educacionais",
    description="API arquitetada com Clean Architecture e integração com Gemini IA.",
    version="2.0.0", # Subimos a versão para marcar a refatoração!
)

# --- REGISTRO DOS ROTEADORES (CONTROLLERS) ---
app.include_router(material_controller.router)
app.include_router(ai_controller.router)

# --- ENDPOINT DE OBSERVABILIDADE ---
@app.get("/health", tags=["Observabilidade"])
def health_check():
    """Retorna o status de saúde da API."""
    return {"status": "ok", "message": "API rodando com Clean Architecture!", "environment": "development"}