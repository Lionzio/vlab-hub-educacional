import pytest
from unittest.mock import patch, MagicMock
from app.services.ai_service import generate_smart_assist

@patch("app.services.ai_service.client.models.generate_content")
def test_generate_smart_assist_success(mock_generate_content):
    """
    Testa a geração do Smart Assist mockando a chamada externa da API do Gemini,
    garantindo que não haja consumo de cota e o comportamento seja determinístico.
    """
    # Setup: Simula a resposta de sucesso do Google Gemini em formato JSON
    mock_response = MagicMock()
    mock_response.text = '{"description": "Material excelente.", "tags": "teste, python, mock"}'
    
    mock_generate_content.return_value = mock_response

    # Execução: Chamamos a função do serviço
    result = generate_smart_assist("Introdução ao Python", "Vídeo")

    # Asserts: Verificamos se o retorno foi parseado corretamente
    assert result["description"] == "Material excelente."
    assert result["tags"] == "teste, python, mock"
    
    # Garante que o SDK foi chamado exatamente 1 vez
    mock_generate_content.assert_called_once()
    
    # Garante que o modelo chamado foi atualizado para o gemini-2.0-flash
    args, kwargs = mock_generate_content.call_args
    assert kwargs["model"] == "gemini-2.0-flash"