import time
import logging
from fastapi import APIRouter, HTTPException

# Imports otimizados isolando os schemas e o serviço de IA
from app.schemas import SmartAssistRequest, SmartAssistResponse
from app.services import generate_smart_assist

router = APIRouter(prefix="/smart-assist", tags=["IA"])

# Utiliza o logger configurado no main.py
logger = logging.getLogger("VoxarHub")


@router.post("/", response_model=SmartAssistResponse)
def smart_assist(request: SmartAssistRequest):
    """
    Gera sugestões de descrição e tags via LLM (Google Gemini).
    Implementa cálculo de latência para observabilidade.
    """
    start_time = time.time()
    try:
        result = generate_smart_assist(request.title, request.resource_type)

        latency = round(time.time() - start_time, 2)
        logger.info(f'[INFO] AI Request: Title="{request.title}", Latency={latency}s')

        return result
    except Exception as e:
        logger.error(f"[ERROR] AI Request Failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao comunicar com a IA.")
