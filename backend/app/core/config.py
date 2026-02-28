from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # O Pydantic automaticamente procurará essa variável nas variáveis de ambiente ou no arquivo .env
    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'

# Instanciamos a configuração para usarmos em todo o projeto
settings = Settings()