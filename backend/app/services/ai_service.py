import json
import logging

from google import genai
from google.genai import types

from app.core.config import settings

# Instancia o cliente da IA globalmente para reuso de conexão e performance
client = genai.Client(api_key=settings.GEMINI_API_KEY)
logger = logging.getLogger("VoxarHub")


def generate_smart_assist(title: str, resource_type: str) -> dict:
    """
    Consulta o Google Gemini para gerar metadados educacionais.
    Utiliza configurações estritas (JSON Mode) para evitar alucinações e erros de parse.
    """
    prompt = f"""
    Atue como um Assistente Pedagógico especialista em materiais didáticos.
    Gere metadados em JSON para o seguinte recurso:

    - Título: {title}
    - Tipo: {resource_type}

    Regras obrigatórias:
    1. A propriedade 'description' deve ter no máximo 2 frases, com tom educativo e engajador.
    2. A propriedade 'tags' deve ser uma única string contendo 3 palavras-chave separadas por vírgula.
    """

    try:
        # Configuração Sênior: Força a API do Google a não usar Markdown
        # e responder EXCLUSIVAMENTE em formato de máquina (JSON puro).
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.7,
        )

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
            config=config,
        )

        # Como forçamos o mimetype, não precisamos mais usar o `.split()`!
        return json.loads(response.text.strip())

    except Exception as e:
        logger.error(f"[AI Service Critical] Falha na comunicação com Gemini: {e}")

        # Degradação Suave (Graceful Degradation):
        # Se a nuvem cair, der timeout ou limite de cota, retornamos um dado padronizado
        # estático para que o usuário não trave e consiga continuar o cadastro.
        return {
            "description": (
                f"Este recurso de {resource_type} aborda o tema "
                f"'{title}' de forma didática."
            ),
            "tags": f"{resource_type}, educação, estudo",
        }
