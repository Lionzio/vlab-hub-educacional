import json
from google import genai
from google.genai import types
from app.core.config import settings

# O novo SDK inicializa o cliente de forma mais limpa
client = genai.Client(api_key=settings.GEMINI_API_KEY)

def generate_smart_assist(title: str, resource_type: str) -> dict:
    """Consulta o Gemini usando o novo SDK oficial 'google-genai'."""
    
    # Prompt Engineering
    prompt = f"""
    Atue como um Assistente Pedagógico especialista em materiais didáticos. 
    Analise o seguinte recurso e gere metadados para alunos:
    
    - Título: {title}
    - Tipo: {resource_type}
    
    Regras de resposta:
    1. A 'description' deve ter 2 frases com tom educativo e engajador.
    2. As 'tags' devem ser 3 palavras-chave separadas por vírgula.
    3. Responda estritamente com um objeto JSON puro.
    
    Formato:
    {{
        "description": "sua descrição aqui",
        "tags": "tag1, tag2, tag3"
    }}
    """
    
    try:
        # A nova sintaxe usa client.models.generate_content
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=prompt,
        )
        
        text = response.text
        
        # Limpeza do Markdown JSON
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        return json.loads(text.strip())
        
    except Exception as e:
        print(f"Erro na geração de IA: {e}") # Usando print temporário para capturar erros detalhados no console local
        return {
            "description": f"Este recurso de {resource_type} aborda o tema '{title}' de forma didática.",
            "tags": f"{resource_type}, educação, estudo"
        }