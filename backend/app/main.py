from fastapi import FastAPI

# Inicialização da aplicação FastAPI
app = FastAPI(
    title="Hub Inteligente de Recursos Educacionais",
    description="API para gerenciamento de materiais didáticos com Smart Assist.",
    version="1.0.0",
)

# Endpoint de Health Check exigido no desafio
@app.get("/health", tags=["Observabilidade"])
def health_check():
    """
    Retorna o status de saúde da API.
    """
    return {
        "status": "ok", 
        "message": "API rodando perfeitamente!",
        "environment": "development"
    }