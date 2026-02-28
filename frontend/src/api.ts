import axios from 'axios';

// Usamos '/api' porque o nosso Proxy no vite.config.ts vai redirecionar para o localhost:8000
const api = axios.create({
  baseURL: '/api',
});

export const resourceApi = {
  // Lista todos os recursos cadastrados no SQLite
  list: () => api.get('/resources/'),
  
  // Cria um novo recurso - Corrigido para POST para enviar o corpo da requisição
  create: (data: any) => api.post('/resources/', data),
  
  // Integração com o Cérebro da aplicação: Chama o Gemini via Backend
  // Corrigido o tipo de dado de 'str' para 'string' (padrão TypeScript)
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;