from sqlalchemy.orm import Session
from app.models.user import UserModel
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> UserModel | None:
        return self.db.query(UserModel).filter(UserModel.email == email).first()

    def create(self, user_data: UserCreate) -> UserModel:
        hashed_pw = get_password_hash(user_data.password)
        db_user = UserModel(
            email=user_data.email, 
            hashed_password=hashed_pw, 
            role=user_data.role
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user