from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Fornecemos um valor padrão 'dummy' para que o Pydantic não quebre durante a coleta de testes unitários.
    # Em produção (Docker), o .env real sobrescreverá este valor automaticamente[cite: 35].
    GEMINI_API_KEY: str = "chave_falsa_para_testes"

    # Sintaxe moderna do Pydantic V2 (Substitui a antiga 'class Config')
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )


# Instanciamos a configuração para usarmos em todo o projeto
settings = Settings()
