import axios from 'axios';

// ---------------------------------------------------------
// Configuração Dinâmica e Segura da Base URL
// ---------------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000, 
});

// ---------------------------------------------------------
// Padrão Repository no Front: Abstração dos Endpoints HTTP
// ---------------------------------------------------------
export const materialApi = {
  // Lista materiais suportando paginação e filtros dinâmicos
  list: (page: number = 1, size: number = 5, search: string = '', type: string = '') => {
    let url = `/materials/?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    return api.get(url);
  },
  
  // Endpoint agregado de métricas
  getMetrics: () => api.get('/materials/metrics'),
  
  create: (data: any) => api.post('/materials/', data),
  delete: (id: number) => api.delete(`/materials/${id}`),
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;