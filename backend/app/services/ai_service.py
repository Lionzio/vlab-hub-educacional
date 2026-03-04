import logging
import json
from google import genai
from google.genai import types
from app.core.config import settings

# Instancia o cliente da nova SDK do Gemini
client = genai.Client(api_key=settings.GEMINI_API_KEY)
logger = logging.getLogger("VoxarHub")


def generate_smart_assist(title: str, resource_type: str) -> dict:
    prompt = f"""
    Atue como um assistente pedagógico especialista.
    Analise o seguinte título de um material didático: "{title}"
    Tipo do material: {resource_type}

    Retorne estritamente um JSON válido no seguinte formato:
    {{
        "description": "Uma descrição engajadora de até 2 parágrafos sobre o que se espera aprender com este material.",
        "tags": "3 palavras-chave separadas por vírgula"
    }}
    """

    try:
        # Chama o modelo mais rápido e eficiente para tarefas de texto
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",  # Força a saída em JSON
                temperature=0.3,  # Baixa criatividade para garantir formatação estrita
            ),
        )

        logger.info(
            "[AI_SERVICE] Resposta gerada e parseada com sucesso pelo Google Gemini."
        )
        return json.loads(response.text)

    except Exception as e:
        logger.error(
            f"[AI_SERVICE_CRITICAL] Falha na comunicação com a API do Gemini: {e}"
        )

        # Degradação Suave (Graceful Degradation):
        # Se a nuvem do Google falhar (timeout, cota excedida, etc),
        # retornamos um dado padronizado estático para que o Frontend não trave.
        return {
            "description": f"Material educacional do tipo {resource_type} focado em {title}. (Metadados gerados automaticamente em modo offline).",
            "tags": "educação, estudo, material",
        }
