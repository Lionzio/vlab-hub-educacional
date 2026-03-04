from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.models.user import UserModel
from app.schemas.user import UserCreate
from app.core.security import get_password_hash


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> UserModel | None:
        """Busca um usuário pelo email de forma otimizada."""
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def create(self, user_data: UserCreate) -> UserModel:
        """Cria um usuário no banco com senha hasheada e tratamento de erro."""
        hashed_pw = get_password_hash(user_data.password)
        db_user = UserModel(
            email=user_data.email, hashed_password=hashed_pw, role=user_data.role
        )
        try:
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return db_user
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Erro de integridade: este e-mail já pode estar em uso.",
            )
