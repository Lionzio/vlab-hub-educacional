# 🚀 V-Lab Hub Educacional

[![CI Quality Check](https://github.com/Lionzio/vlab-hub-educacional/actions/workflows/ci.yml/badge.svg)](https://github.com/Lionzio/vlab-hub-educacional/actions/workflows/ci.yml)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)

O **V-Lab Hub Educacional** é uma plataforma Fullstack de alta performance projetada para o gerenciamento inteligente de recursos didáticos. Através de uma arquitetura moderna e escalável, o sistema permite que educadores organizem acervos digitais com o suporte de **Inteligência Artificial Generativa**, automatizando a categorização e enriquecendo a experiência de aprendizado.

## 📖 Visão Geral do Sistema

O projeto resolve o desafio de manter grandes volumes de materiais educacionais (vídeos, PDFs e links) organizados. Através da funcionalidade **Smart Assist**, integrada ao modelo **Gemini 2.0 Flash**, a plataforma analisa o título de um recurso e gera automaticamente descrições pedagógicas e tags de busca precisas.

### 🛡️ Segurança e Acessos (RBAC)
O sistema implementa **Controle de Acesso Baseado em Funções (RBAC)** via tokens JWT:
* **Conteudista:** Permissão total para criar, editar, excluir e gerenciar materiais.
* **Aluno:** Acesso de apenas leitura ao acervo, focado no consumo de conteúdo.

## 🧠 Arquitetura e Engenharia de Software

A aplicação foi construída sob os pilares da **Clean Architecture** e dos princípios **SOLID**, garantindo que o código seja testável e de fácil manutenção.

### 🐍 Backend (FastAPI & DDD)
O backend utiliza uma abordagem **Domain-Driven**, onde as responsabilidades são estritamente isoladas:
* **Controllers:** Gerenciam o tráfego HTTP e contratos de API.
* **Services & Repositories:** Separam a lógica de negócio da persistência de dados. O uso do **SQLAlchemy** permite que o banco de dados seja agnóstico.
* **Security Core:** Implementação nativa de criptografia de senhas com `bcrypt` e autenticação segura via `OAuth2` com JWT.

### ⚛️ Frontend (React & TypeScript)
A interface foi desenvolvida para ser rápida e responsiva:
* **Hooks Customizados:** Toda a lógica de estado e chamadas à API (Axios) está isolada em `useMaterials.ts` e `AuthContext.tsx`.
* **Componentização Atômica:** Elementos de UI são modulares e reutilizáveis, garantindo consistência visual.

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Papel no Projeto |
| :--- | :--- | :--- |
| **Linguagem** | Python 3.11 | Processamento assíncrono e lógica de alto nível. |
| **Framework Web** | FastAPI | Criação de rotas e documentação automática (Swagger). |
| **Interface** | React + Vite | SPA (Single Page Application) moderna e tipada. |
| **IA** | Google Gemini 2.0 | Engine de processamento de linguagem natural. |
| **Banco de Dados** | PostgreSQL 18 | Armazenamento persistente e relacional. |
| **Containerização** | Docker & Compose | Padronização do ambiente de execução. |
| **Qualidade** | Pytest, Black, Flake8 | Automação de testes e garantia de estilo PEP8. |

## 🚀 Como Executar o Projeto

A forma recomendada de rodar o V-Lab Hub é via **Docker**, garantindo que todas as dependências funcionem instantaneamente.

### Pré-requisitos
* **Docker** e **Docker Compose** instalados.
* Uma chave de API do **Google Gemini** (Obtenha no [Google AI Studio](https://aistudio.google.com/)).

### 1. Configuração do Ambiente
Na raiz do projeto, crie um arquivo `.env` seguindo o modelo:
```env
GEMINI_API_KEY=sua_chave_aqui
DATABASE_URL=postgresql://voxar:voxarpassword@db:5432/voxarhub

2. Inicialização Total (Docker)
Execute o comando abaixo para subir o banco de dados e o servidor backend:

Bash

docker-compose up -d --build

Backend: http://localhost:8000
Documentação (Swagger): http://localhost:8000/docs

3. Inicialização do Frontend
Navegue até a pasta do frontend e inicie o ambiente de desenvolvimento:

Bash

cd frontend
npm install
npm run dev

Frontend: http://localhost:5173

🧪 Qualidade e Testes Automatizados
O projeto conta com uma suíte de testes que utiliza Mocks para simular chamadas de IA e um banco de dados em memória para garantir velocidade.
Rodar Testes Unitários

Bash

docker-compose exec backend pytest -v

Formatação de Código (Black)

Bash

docker-compose exec backend black .

🌐 Deploy e CI/CD
O projeto está configurado para Deploy Contínuo.
CI (GitHub Actions): Cada push dispara uma esteira que valida a formatação (Black), o estilo (Flake8) e executa todos os testes (Pytest).
Nuvem: O Backend está preparado para o Render/Docker e o Frontend para a Vercel.
Desenvolvido por Vinícius (Lionzio) ☕🚀