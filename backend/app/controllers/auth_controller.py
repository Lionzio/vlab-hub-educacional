from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse, Token
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registra um novo usuário",
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    repo = UserRepository(db)

    # 🛡️ Higienização Sênior
    user.email = user.email.strip().lower()

    # Validação de existência
    if repo.get_by_email(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este e-mail já está cadastrado no V-Lab.",
        )

    return repo.create(user)


@router.post("/login", response_model=Token, summary="Gera token de acesso")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    repo = UserRepository(db)

    # OAuth2PasswordRequestForm usa 'username' para o campo de identificação
    clean_email = form_data.username.strip().lower()
    user = repo.get_by_email(clean_email)

    # 🛡️ Programação Defensiva: Não informamos se o erro foi no email ou na senha
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
        )

    access_token = create_access_token(data={"sub": user.email, "role": user.role})

    return {"access_token": access_token, "token_type": "bearer", "role": user.role}
