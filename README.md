# 🚀 V-Lab Hub Educacional

[![CI Quality Check](https://github.com/Lionzio/vlab-hub-educacional/actions/workflows/ci.yml/badge.svg)](https://github.com/Lionzio/vlab-hub-educacional/actions/workflows/ci.yml)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

O V-Lab Hub Educacional é uma plataforma Fullstack desenvolvida como solução para o desafio técnico de estágio do V-Lab / CIn-UFPE. 

O objetivo do sistema é permitir o cadastro, categorização e gerenciamento de recursos didáticos. O grande diferencial da plataforma é o **Smart Assist**, uma integração direta com Inteligência Artificial (Google Gemini) que atua como um assistente pedagógico, gerando descrições engajadoras e tags de categorização de forma 100% autônoma a partir do título do material.

## 🌍 Ambiente de produção (Live demo)

O projeto está publicado e operando na nuvem com pipeline de CI/CD contínuo. Você pode testar a plataforma em tempo real sem precisar rodar o projeto localmente:

* 🖥️ Aplicação Web (Frontend na Vercel): [https://vlab-hub-educacional.vercel.app/](https://vlab-hub-educacional.vercel.app/)
* **⚙️ Documentação da API (Swagger UI no Render):** [https://vlab-hub-educacional-backend.onrender.com/docs](https://vlab-hub-educacional-backend.onrender.com/docs)

## 🧠 O que, como e por que? (Visão arquitetural)

Este projeto foi construído fugindo do padrão "código espaguete" comum em projetos iniciantes. O foco foi aplicar os princípios SOLID e criar uma base de código escalável, testável e de fácil manutenção.

### 🐍 Backend (Clean architecture)
O servidor foi desenhado em camadas concêntricas (Domain-Driven), garantindo a separação de responsabilidades (Separation of Concerns):
* Controllers: Lidam estritamente com o roteamento HTTP e status codes.
* Services: Onde vive a regra de negócio e a integração com a IA externa. Isolamento total das regras da API.
* Repositories: Isolam completamente o SQLAlchemy. Se amanhã o banco mudar de PostgreSQL para MongoDB, os Controllers e Services não precisarão sofrer nenhuma alteração.
* Schemas: Contratos rigorosos de validação de dados de entrada e saída, utilizando o Pydantic V2 para garantir que apenas dados seguros entrem no banco.

### ⚛️ Frontend (Atomic design & Custom hooks)
A interface em React (Vite/TypeScript) foi refatorada para o mais alto nível de modularidade:
* Atomic design: Componentes visuais foram quebrados em "blocos de montar" puros e tipados (`Button`, `Input`, `Tag`), reaproveitados para formar estruturas complexas como o `MaterialForm`.
* Hooks customizados: Toda a lógica de estado, *loading* e chamadas de API do Axios foi isolada dentro do `useMaterials.ts`, mantendo os componentes visuais focados apenas em desenhar a tela e capturar eventos de usuário.

### ⚙️ DevOps & Qualidade garantida (CI/CD)
* O projeto opera em um Monorepo com ambientes estritamente isolados (Pipfile exclusivo no backend, package.json exclusivo no frontend).
* Pipeline de CI (GitHub Actions): Todo código enviado passa pela esteira automatizada que roda o *Black* (Formatador de Estrutura Geométrica) e o *Flake8* (Linter de Estilo PEP8), garantindo um código imaculado e padronizado antes do deploy.
* Testes mockados: Os testes unitários do Pytest utilizam `unittest.mock` para simular as respostas do Google Gemini. Isso garante a qualidade do código de forma determinística, sem gerar latência ou custos na cota real da API durante as validações no CI/CD.

## 🛠️ Stack tecnológico

| Camada | Tecnologia principal | Bibliotecas & Ferramentas de apoio |
| :--- | :--- | :--- |
| Backend | Python 3.11, FastAPI | SQLAlchemy (ORM), Pydantic V2, Uvicorn |
| Inteligência Artificial | Google Gemini 2.0 Flash | Novo SDK Oficial (`google-genai`) |
| Frontend | React, TypeScript, Vite | Axios, Lucide-React (Ícones) |
| Banco de Dados | PostgreSQL 15 | Imagem Oficial Docker (Alpine), Render (Nuvem) |
| Infra/Qualidade | Docker & Compose, Git | GitHub Actions, Pipenv, Pytest, Black, Flake8 |
## 📁 Estrutura do monorepo

vlab-hub-educacional/
├── .github/workflows/ci.yml     # Esteira de CI/CD (Linter e testes automáticos)
├── backend/                     # API FastAPI e lógica de negócios
│   ├── app/
│   │   ├── controllers/         # Endpoints da REST API
│   │   ├── core/                # Configurações (.env) e conexão de banco
│   │   ├── models/              # Entidades do DB
│   │   ├── repositories/        # Transações do banco de dados isoladas
│   │   ├── schemas/             # Validação tipada (Pydantic)
│   │   └── services/            # Orquestração e conexão com Gemini IA
│   ├── tests/                   # Pytest com mock do SDK do Google
│   ├── Dockerfile               # Imagem otimizada do Python para deploy
│   └── Pipfile / Pipfile.lock   # Gerenciamento determinístico de pacotes
├── frontend/                    # SPA React com TypeScript
│   ├── src/
│   │   ├── components/ui/       # Componentes atômicos (Botões, Inputs)
│   │   ├── hooks/               # Regras de negócio do front isoladas
│   │   ├── types/               # Tipagens estritas das entidades
│   │   └── api.ts               # Proxy de conexão e instâncias do Axios
├── docker-compose.yml           # Orquestração do backend e PostgreSQL local
└── .env.example                 # Contrato de variáveis de ambiente seguras


🚀 Como executar o projeto localmente
O projeto utiliza contêineres para garantir que rode perfeitamente em qualquer sistema operacional (Windows, Linux ou macOS) garantindo um ecossistema livre da síndrome "Na minha máquina funciona".
Pré-requisitos
Docker e docker compose instalados e rodando.
Node.js (v18+) instalado (apenas para rodar o Frontend localmente).
Uma chave de API do Google Gemini (obtenha gratuitamente no Google AI Studio).
Passo 1: Configuração do ambiente
Na raiz do projeto, crie um arquivo chamado .env e adicione a sua chave de API (siga o modelo do .env.example):

Snippet de código

GEMINI_API_KEY=sua_chave_secreta_aqui


Passo 2: Inicializando a infraestrutura (API + Banco de Dados)
Abra o seu terminal na raiz do projeto e orquestre os contêineres:
Bash
docker-compose up --build


(A primeira execução pode levar alguns minutos para baixar as imagens do Python e PostgreSQL).
Backend disponível em: http://localhost:8000
Swagger UI (Docs Interativos): http://localhost:8000/docs
Passo 3: Inicializando a interface gráfica (Frontend)
Abra uma nova aba no terminal, navegue até a pasta do frontend e inicie o servidor do Vite:
Bash
cd frontend
npm install
npm run dev
Aplicação disponível em: http://localhost:5173
(O Frontend já está configurado com um proxy interno no vite.config.ts para evitar erros de CORS ao se comunicar de forma transparente com a API do Docker).
🧪 Como rodar os testes unitários
Para garantir a qualidade do sistema sem gastar a cota da API da Inteligência Artificial, os testes foram configurados localmente no backend utilizando dublês de teste (Mocks).
Com o Docker em execução, abra um terminal e execute os testes diretamente dentro do container isolado:
Bash
docker-compose exec backend python -m pytest


Desenvolvido com dedicação, padrões arquiteturais e muitas xícaras de café para o processo seletivo do V-Lab. ☕🚀