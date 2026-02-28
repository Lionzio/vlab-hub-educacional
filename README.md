# 🚀 V-Lab Hub Educacional

Hub Inteligente de Recursos Educacionais desenvolvido como desafio técnico para o processo seletivo do V-Lab (CIn-UFPE).

Esta aplicação Fullstack permite o cadastro e gerenciamento de materiais didáticos, contando com o recurso Smart Assist, uma integração com Inteligência Artificial (Google Gemini) que atua como um Assistente Pedagógico para gerar descrições engajadoras e tags de categorização de forma automática.

## 🏗️ Arquitetura e tecnologias

O projeto foi construído sob os princípios de Clean Architecture, SOLID e Separação de Responsabilidades (SoC), garantindo um software escalável, testável e de fácil manutenção.

### 🐍 Backend
* **Linguagem & Framework:** Python 3.11 + FastAPI
* **Design Patterns:** Controller-Service-Repository
* **Banco de Dados:** PostgreSQL (via SQLAlchemy ORM)
* **Validação de Dados:** Pydantic V2
* **Inteligência Artificial:** Google Gemini 1.5 Flash (utilizando o novo SDK oficial `google-genai`)
* **Testes:** Pytest (com `unittest.mock` para simulação da IA)
* **Gerenciamento de Pacotes:** Pipenv (builds determinísticos com `Pipfile.lock`)

### ⚛️ Frontend
* **Ecossistema:** React + TypeScript + Vite
* **Design Pattern:** Componentização estrita e Custom Hooks (`useMaterials.ts`) para isolar regras de negócio da UI.
* **Estilização & Ícones:** Inline Styles e Lucide-react
* **Comunicação de Rede:** Axios configurado com Proxy reverso local

### ⚙️ DevOps & Infraestrutura
* **Containerização:** Docker & Docker Compose (Orquestração de Backend e Banco de Dados com volumes persistentes)
* **CI/CD:** GitHub Actions (Pipeline de Continuous Integration executando Linter/Formatter com Flake8 e Black)

## 📁 Estrutura do projeto

```text
v-lab-hub-educacional/
├── backend/
│   ├── app/
│   │   ├── controllers/         # Endpoints da API RESTful (Roteamento)
│   │   ├── services/            # Regras de negócio e integração com a IA
│   │   ├── repositories/        # Isolamento de acesso a dados (SQLAlchemy)
│   │   ├── core/                # Configurações de ambiente (.env) e conexão com DB
│   │   ├── models/              # Modelos do banco de dados PostgreSQL
│   │   └── schemas/             # Validação de dados de entrada/saída (Pydantic V2)
│   ├── tests/                   # Testes unitários mockados
│   ├── Dockerfile               # Imagem Python 3.11-slim configurada com Pipenv
│   └── Pipfile                  # Dependências isoladas e travadas
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes visuais "dumb" e "smart"
│   │   ├── hooks/               # Lógica de estado e chamadas de API isoladas
│   │   └── api.ts               # Serviço centralizado do Axios
├── .github/workflows/ci.yml     # Esteira de testes e qualidade de código
└── docker-compose.yml           # Orquestrador de infraestrutura local


🚀 Como executar o projeto localmente
Pré-requisitos
Docker e Docker Compose instalados na máquina.
Node.js (v18 ou superior) instalado.
Chave de API do Google Gemini (obtenha em Google AI Studio).
1. Configuração do ambiente
Na raiz do projeto, crie um arquivo chamado .env e adicione a sua chave de API:

Snippet de código


GEMINI_API_KEY=sua_chave_de_api_aqui


2. Rodando a infraestrutura (Backend + Banco de dados)
Na raiz do projeto, execute o Docker Compose para subir o PostgreSQL e o FastAPI:

Bash

docker-compose up --build


O Backend estará disponível em: http://localhost:8000
Documentação interativa (Swagger UI) disponível em: http://localhost:8000/docs
3. Rodando a interface (Frontend)
Abra um novo terminal, navegue até a pasta do frontend e inicie o Vite:

Bash

cd frontend
npm install
npm run dev


O Frontend estará disponível em: http://localhost:5173
🧪 Executando os testes unitários
O projeto conta com testes unitários para validar as regras de negócio sem consumir a cota da API do Google, utilizando técnicas de Mocking.
Para rodar os testes localmente:
Acesse o diretório do backend: cd backend
Instale as dependências de desenvolvimento: python -m pipenv install --dev
Execute o Pytest como módulo: python -m pipenv run python -m pytest

Desenvolvido com dedicação para o V-Lab por Vinícius Leôncio.