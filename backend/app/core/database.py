import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# URL do banco injetada via variável de ambiente (Docker) ou fallback para SQLite (Local)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# Proteção Sênior: O SQLite exige check_same_thread=False, mas o Postgres não aceita esse argumento.
# Criamos uma lógica condicional para que a aplicação não quebre dependendo do ambiente.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

# Inicializa a engine de conexão
engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependência para gerar e fechar a sessão do banco por cada requisição."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()