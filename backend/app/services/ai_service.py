import google.generativeai as genai
import json
from app.core.config import settings

# Configuração da chave de API extraída de variáveis de ambiente para segurança [cite: 35, 57]
genai.configure(api_key=settings.GEMINI_API_KEY)

def generate_smart_assist(title: str, resource_type: str) -> dict:
    """
    Consulta o Gemini 1.5 Flash para gerar descrições e categorizações automáticas[cite: 6, 54].
    Atua como um 'Assistente Pedagógico' para gerar descrições úteis para alunos.
    """
    
    # Inicialização do modelo Gemini 1.5 Flash 
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    
    # Prompt Engineering: Instruções claras para garantir saída em JSON estrito [cite: 34, 56]
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
        # Chamada à API da LLM [cite: 29]
        response = model.generate_content(prompt)
        text = response.text
        
        # Tratamento de formato: remove delimitadores de markdown caso a IA os inclua 
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        return json.loads(text.strip())
        
    except Exception as e:
        # Fallback/Mock: Garante que o sistema continue funcional mesmo se a API falhar [cite: 41, 54]
        return {
            "description": f"Este recurso de {resource_type} aborda o tema '{title}' de forma didática.",
            "tags": f"{resource_type}, educação, estudo"
        }