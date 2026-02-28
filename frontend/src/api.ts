import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const materialApi = {
  // Atualizado de /resources/ para /materials/
  list: () => api.get('/materials/'),
  
  create: (data: any) => api.post('/materials/', data),
  
  // A rota de IA continua igual, pois isolamos ela no ai_controller
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;