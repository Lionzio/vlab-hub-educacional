import pytest
from fastapi import status


def test_register_user_success(client):
    """Garante que um usuário pode se cadastrar corretamente."""
    response = client.post(
        "/auth/register",
        json={"email": "novo@vlab.com", "password": "123", "role": "aluno"},
    )
    assert response.status_code == status.HTTP_201_CREATED
    data = response.json()
    assert data["email"] == "novo@vlab.com"
    assert "id" in data


def test_register_duplicate_email(client):
    """Garante que o sistema recusa e-mails duplicados com a mensagem correta."""
    # Primeiro registro
    client.post(
        "/auth/register",
        json={"email": "clone@vlab.com", "password": "123", "role": "aluno"},
    )

    # Tentativa de duplicata
    response = client.post(
        "/auth/register",
        json={"email": "clone@vlab.com", "password": "abc", "role": "aluno"},
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "Este e-mail já está cadastrado no V-Lab."


def test_login_user_success(client):
    """Garante que o login devolve um token Bearer válido e o role do usuário."""
    # Cria o usuário para o teste de login
    email = "login_test@vlab.com"
    password = "password123"
    client.post(
        "/auth/register", json={"email": email, "password": password, "role": "aluno"}
    )

    # Tenta o login (OAuth2 usa form-data, não JSON bruto)
    response = client.post(
        "/auth/login", data={"username": email, "password": password}
    )

    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["role"] == "aluno"


def test_login_invalid_credentials(client):
    """Garante que credenciais erradas retornam 401 Unauthorized."""
    response = client.post(
        "/auth/login",
        data={"username": "nao_existe@vlab.com", "password": "wrong_password"},
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json()["detail"] == "E-mail ou senha incorretos."
