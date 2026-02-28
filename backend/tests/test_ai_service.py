import pytest
from unittest.mock import patch, MagicMock
from app.services.ai_service import generate_smart_assist

# O decorador patch vai interceptar a chamada do novo SDK
@patch("app.services.ai_service.client.models.generate_content")
def test_generate_smart_assist_success(mock_generate_content):
    # Setup: Simular a resposta do Google Gemini
    mock_response = MagicMock()
    mock_response.text = '{"description": "Material excelente.", "tags": "teste, python, mock"}'
    
    # Faz com que o mock retorne a resposta falsa que criamos
    mock_generate_content.return_value = mock_response

    # Execução: Chamamos a função como se fosse na API
    result = generate_smart_assist("Introdução ao Python", "Vídeo")

    # Asserts (Verificações): O resultado deve ser o JSON mockado
    assert result["description"] == "Material excelente."
    assert result["tags"] == "teste, python, mock"
    
    # Garante que o SDK foi chamado 1 vez com o modelo correto
    mock_generate_content.assert_called_once()
    args, kwargs = mock_generate_content.call_args
    assert kwargs["model"] == "gemini-1.5-flash"