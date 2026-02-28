🎓 V-Lab Hub Educacional
O V-Lab Hub é uma plataforma inteligente para curadoria e gerenciamento de recursos didáticos. O grande diferencial do projeto é o Smart Assist, um assistente pedagógico baseado em Inteligência Artificial (Google Gemini) que automatiza a criação de descrições e a categorização de materiais, otimizando o tempo de educadores e alunos.

🚀 Tecnologias utilizadas
O projeto foi construído com uma stack moderna e escalável, focada em performance e tipagem estrita:
Backend: FastAPI (Python 3.11).
Frontend: React + TypeScript (Vite).
Inteligência Artificial: Google Gemini SDK (Modelo: gemini-1.5-flash).
Banco de Dados: SQLite com SQLAlchemy (ORM).
Containerização: Docker e Docker Compose.
Observabilidade: Logs estruturados de latência de IA.


🧠 Diferenciais técnicos
1. Smart Assist (AI Integration)
Ao contrário de preenchimentos manuais tediosos, o usuário fornece apenas o título e o tipo do recurso. O backend consulta o Gemini através de um System Prompt rigoroso que força a IA a atuar como um assistente pedagógico, retornando dados estruturados em JSON.
2. Arquitetura e Segurança
Segurança de chaves: Implementação de variáveis de ambiente via .env para proteção de credenciais sensíveis.
Proxy reverso: Configuração de Proxy no Vite para evitar erros de CORS entre o Frontend (5173) e o Backend (8000).
Clean code: Separação clara entre Modelos (Banco), Schemas (Validação Pydantic) e Serviços (Lógica de IA).

🛠️ Como rodar o projeto
Pré-requisitos
Docker e Docker Compose instalados.
Uma chave de API do Google AI Studio.
Passo a passo
Clone o repositório:
Bash
git clone https://github.com/seu-usuario/voxar-hub-educacional.git
cd voxar-hub-educacional


Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto e adicione sua chave:
Snippet de código
GEMINI_API_KEY=sua_chave_aqui


Suba os containers:
Bash
docker-compose up --build


Acesse a aplicação:
Frontend: http://localhost:5173
Documentação da API (Swagger): http://localhost:8000/docs


📈 Monitoramento (Observabilidade)
O sistema registra logs detalhados no terminal do backend para cada requisição de IA, incluindo:
Título processado.
Status da resposta.
Latência em segundos, permitindo identificar gargalos de performance.


👩‍💻 Autor
Desenvolvido por Vinícius como parte do desafio técnico para a V-Lab.