def test_create_material_unauthorized(client):
    """Garante que um anônimo (sem token) leva Erro 401 ao tentar criar material."""
    response = client.post(
        "/materials/",
        json={"title": "Hack", "resource_type": "Vídeo", "url": "http://hack.com"},
    )
    assert response.status_code == 401


def test_create_material_as_aluno_forbidden(client, aluno_token):
    """Garante que um Aluno leva Erro 403 (Forbidden) ao tentar criar material."""
    headers = {"Authorization": f"Bearer {aluno_token}"}
    response = client.post(
        "/materials/",
        json={"title": "Hack", "resource_type": "Vídeo", "url": "http://hack.com"},
        headers=headers,
    )
    assert response.status_code == 403


def test_create_material_as_conteudista_success(client, conteudista_token):
    """Garante que um Conteudista consegue criar um material perfeitamente."""
    headers = {"Authorization": f"Bearer {conteudista_token}"}
    data = {
        "title": "Material Teste Pytest",
        "resource_type": "PDF",
        "url": "http://teste.com/doc.pdf",
    }
    response = client.post("/materials/", json=data, headers=headers)
    assert response.status_code == 201
    assert response.json()["title"] == "Material Teste Pytest"
