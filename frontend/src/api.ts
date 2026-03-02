import axios from 'axios';

// ---------------------------------------------------------
// Configuração Dinâmica da Base URL
// ---------------------------------------------------------
// No ambiente local (dev), o VITE_API_URL estará vazio, então ele usa '/api'
// e o nosso proxy configurado no vite.config.ts faz o redirecionamento.
// Na nuvem (Vercel), nós cadastraremos a variável VITE_API_URL apontando
// para a URL real do Render (ex: https://vlab-backend.onrender.com).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// ---------------------------------------------------------
// Abstração das Chamadas HTTP (Padrão Repository no Front)
// ---------------------------------------------------------
export const materialApi = {
  // Lista todos os materiais cadastrados
  list: () => api.get('/materials/'),
  
  // Cria um novo material no banco de dados
  create: (data: any) => api.post('/materials/', data),
  
  // Rota isolada para requisições de Inteligência Artificial
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;