import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000, 
});

export const materialApi = {
  // Constrói a URL dinamicamente incluindo os filtros se existirem
  list: (page: number = 1, size: number = 5, search: string = '', type: string = '') => {
    let url = `/materials/?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    return api.get(url);
  },
  
  create: (data: any) => api.post('/materials/', data),
  delete: (id: number) => api.delete(`/materials/${id}`),
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;