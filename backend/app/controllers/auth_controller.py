from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse, Token
from app.repositories.user_repository import UserRepository
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post(
    "/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED
)
def register(user: UserCreate, db: Session = Depends(get_db)):
    repo = UserRepository(db)

    # Higienização de Dados (Programação Defensiva Sênior)
    # Remove espaços vazios acidentais e força letras minúsculas no banco.
    clean_email = user.email.strip().lower()
    user.email = clean_email

    if repo.get_by_email(clean_email):
        raise HTTPException(
            status_code=400, detail="Este e-mail já está cadastrado. Faça login."
        )
    return repo.create(user)


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    repo = UserRepository(db)

    # Higienização na hora de comparar o input do usuário com o banco
    clean_email = form_data.username.strip().lower()
    user = repo.get_by_email(clean_email)

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")

    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}
