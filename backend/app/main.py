import time
import logging
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

# Importações dos nossos módulos internos
from app.core.database import engine, Base, get_db
from app.models import resource as resource_model
from app.schemas import resource as resource_schema
from app.schemas import ai as ai_schema
from app.services import ai_service

# Cria as tabelas no banco de dados (no SQLite, isso gera o arquivo sql_app.db)
resource_model.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Hub Inteligente de Recursos Educacionais",
    description="API para gerenciamento de materiais didáticos com Smart Assist.",
    version="1.0.0",
)

# Configuração do Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("VoxarHub")

# --- ENDPOINT DE OBSERVABILIDADE ---
@app.get("/health", tags=["Observabilidade"])
def health_check():
    """Retorna o status de saúde da API."""
    return {"status": "ok", "message": "API rodando perfeitamente!", "environment": "development"}


# --- ENDPOINT SMART ASSIST (IA) ---
@app.post("/smart-assist/", response_model=ai_schema.SmartAssistResponse, tags=["IA"])
def smart_assist(request: ai_schema.SmartAssistRequest):
    """Gera sugestões de descrição e tags via LLM (Google Gemini)."""
    start_time = time.time()
    
    try:
        # Chama nosso serviço de IA
        result = ai_service.generate_smart_assist(request.title, request.resource_type)
        
        # Calcula o tempo gasto (Latência)
        latency = round(time.time() - start_time, 2)
        
        # Log Estruturado (Requisito DevOps/Observabilidade)
        logger.info(f'[INFO] AI Request: Title="{request.title}", Latency={latency}s')
        
        return result
    except Exception as e:
        logger.error(f'[ERROR] AI Request Failed: {str(e)}')
        raise HTTPException(status_code=500, detail="Erro ao comunicar com a IA.")


# --- ENDPOINTS DO CRUD DE RECURSOS ---

@app.post("/resources/", response_model=resource_schema.ResourceResponse, status_code=status.HTTP_201_CREATED, tags=["Recursos"])
def create_resource(resource: resource_schema.ResourceCreate, db: Session = Depends(get_db)):
    """Cadastra um novo recurso educacional."""
    db_resource = resource_model.ResourceModel(**resource.model_dump())
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

@app.get("/resources/", response_model=List[resource_schema.ResourceResponse], tags=["Recursos"])
def list_resources(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """Lista os recursos cadastrados com paginação."""
    resources = db.query(resource_model.ResourceModel).offset(skip).limit(limit).all()
    return resources

@app.get("/resources/{resource_id}", response_model=resource_schema.ResourceResponse, tags=["Recursos"])
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    """Busca um recurso específico pelo ID."""
    db_resource = db.query(resource_model.ResourceModel).filter(resource_model.ResourceModel.id == resource_id).first()
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Recurso não encontrado.")
    return db_resource

@app.put("/resources/{resource_id}", response_model=resource_schema.ResourceResponse, tags=["Recursos"])
def update_resource(resource_id: int, resource: resource_schema.ResourceUpdate, db: Session = Depends(get_db)):
    """Atualiza os dados de um recurso existente."""
    db_resource = db.query(resource_model.ResourceModel).filter(resource_model.ResourceModel.id == resource_id).first()
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Recurso não encontrado.")
    
    # Atualiza os campos dinamicamente
    for key, value in resource.model_dump(exclude_unset=True).items():
        setattr(db_resource, key, value)
        
    db.commit()
    db.refresh(db_resource)
    return db_resource

@app.delete("/resources/{resource_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Recursos"])
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    """Exclui um recurso do banco de dados."""
    db_resource = db.query(resource_model.ResourceModel).filter(resource_model.ResourceModel.id == resource_id).first()
    if db_resource is None:
        raise HTTPException(status_code=404, detail="Recurso não encontrado.")
    
    db.delete(db_resource)
    db.commit()
    return None