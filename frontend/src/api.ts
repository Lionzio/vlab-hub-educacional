import axios from 'axios';

// ---------------------------------------------------------
// Configuração Dinâmica e Segura da Base URL
// ---------------------------------------------------------
const api = axios.create({
  // Em desenvolvimento usa o proxy do Vite ('/api'). Em produção, usa a URL do Render.
  baseURL: import.meta.env.VITE_API_URL || '/api',
  
  // Blindagem Arquitetural: Corta a requisição se demorar mais de 15s.
  timeout: 15000, 
});

// ---------------------------------------------------------
// Padrão Repository no Front: Abstração dos Endpoints
// ---------------------------------------------------------
export const materialApi = {
  // Lista materiais suportando paginação via Query Params
  list: (page: number = 1, size: number = 5) => api.get(`/materials/?page=${page}&size=${size}`),
  
  // Cria um novo recurso
  create: (data: any) => api.post('/materials/', data),
  
  // Deleta um recurso existente
  delete: (id: number) => api.delete(`/materials/${id}`),
  
  // Rota isolada da IA
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;