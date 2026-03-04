FROM python:3.11-slim

WORKDIR /app

# Instalação do gerenciador de pacotes
RUN pip install pipenv

# Copia os arquivos de configuração de dependências
COPY Pipfile Pipfile.lock ./

# CORREÇÃO: Adicionado --dev para ter pytest/black e --deploy para segurança
RUN pipenv install --system --dev
# Copia todo o código fonte
COPY . .

# Comando padrão (será sobrescrito pelo compose em dev, mas mantemos para nuvem)
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]