import time
import logging
from fastapi import APIRouter, HTTPException
from app.schemas import ai as ai_schema
from app.services import ai_service

router = APIRouter(prefix="/smart-assist", tags=["IA"])

# Configuração do Logger
logger = logging.getLogger("VoxarHub")

@router.post("/", response_model=ai_schema.SmartAssistResponse)
def smart_assist(request: ai_schema.SmartAssistRequest):
    """Gera sugestões de descrição e tags via LLM (Google Gemini)."""
    start_time = time.time()
    
    try:
        result = ai_service.generate_smart_assist(request.title, request.resource_type)
        latency = round(time.time() - start_time, 2)
        logger.info(f'[INFO] AI Request: Title="{request.title}", Latency={latency}s')
        return result
    except Exception as e:
        logger.error(f'[ERROR] AI Request Failed: {str(e)}')
        raise HTTPException(status_code=500, detail="Erro ao comunicar com a IA.")