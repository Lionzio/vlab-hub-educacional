import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool  # 🛡️ A Chave Mestra Sênior

from app.main import app
from app.core.database import Base, get_db
from app.core.security import create_access_token

from app.models.user import UserModel
from app.models.material import EducationalMaterialModel

# Configuração de Multithreading:
# Forçamos o SQLAlchemy a usar o StaticPool. Assim, a Thread do FastAPI
# e a Thread do Pytest vão enxergar exatamente a mesma memória RAM.
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,  # <-- Impede que o banco suma!
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db():
    """Cria as tabelas antes de cada teste e as destrói logo depois."""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db):
    """Intercepta o banco real e injeta o banco em memória para o FastAPI."""

    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    del app.dependency_overrides[get_db]


@pytest.fixture(scope="function")
def conteudista_token():
    """Gera um token JWT falso, mas matematicamente válido, para testarmos o RBAC."""
    return create_access_token(data={"sub": "pytest@vlab.com", "role": "conteudista"})


@pytest.fixture(scope="function")
def aluno_token():
    """Gera um token de Aluno (Sem permissão de escrita)."""
    return create_access_token(data={"sub": "aluno@vlab.com", "role": "aluno"})
