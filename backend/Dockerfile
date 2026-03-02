FROM python:3.11-slim

WORKDIR /app

# Instalação do gerenciador de pacotes
RUN pip install pipenv

# Copia os arquivos de configuração de dependências
COPY Pipfile Pipfile.lock ./

# Instala as dependências diretamentes no sistema do container
RUN pipenv install --system --deploy

# Copia todo o código fonte para dentro do container
COPY . .

# Comando obrigatório para Nuvem: Inicia o servidor FastAPI usando a porta dinâmica
# (Se a variável PORT não for definida, ele usa a 8000 como padrão)
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]