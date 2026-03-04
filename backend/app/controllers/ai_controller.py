import time
import logging
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.ai import SmartAssistRequest, SmartAssistResponse
from app.services.ai_service import generate_smart_assist
from app.core.security import get_current_user  # 🛡️ Guarda-costas JWT

router = APIRouter(prefix="/smart-assist", tags=["IA"])
logger = logging.getLogger("VoxarHub")


@router.post("/", response_model=SmartAssistResponse)
def smart_assist(
    request: SmartAssistRequest,
    current_user: dict = Depends(
        get_current_user
    ),  # Protege a rota e identifica quem chamou
):
    """
    Gera metadados usando Inteligência Artificial.
    Rota protegida: Requer usuário autenticado.
    """
    start_time = time.time()

    # Observabilidade: Log estruturado do início da requisição
    logger.info(
        f"[AI_REQUEST_START] User: '{current_user['email']}' | "
        f"Material: '{request.title}' | Tipo: '{request.resource_type}'"
    )

    try:
        # Chama a camada de serviço (Onde a regra de negócio vive)
        result = generate_smart_assist(request.title, request.resource_type)

        latency = round(time.time() - start_time, 2)

        # Observabilidade: Métrica de sucesso com latência mapeada
        logger.info(
            f"[AI_METRIC_SUCCESS] Latência: {latency}s | "
            f"User: '{current_user['email']}' | Material: '{request.title}'"
        )

        return result

    except Exception as e:
        latency = round(time.time() - start_time, 2)

        # Observabilidade: Métrica de falha crítica
        logger.error(
            f"[AI_METRIC_ERROR] Falha após {latency}s | "
            f"User: '{current_user['email']}' | Erro: {str(e)}"
        )
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="O Assistente de IA está indisponível no momento.",
        )
