import axios from 'axios';

// ---------------------------------------------------------
// Configuração Dinâmica e Segura da Base URL
// ---------------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000, 
});

// ---------------------------------------------------------
// 🛡️ INTERCEPTOR SÊNIOR (Middleware de Frontend)
// Antes de qualquer requisição sair do Front, ele intercepta
// e injeta a chave de segurança (Bearer Token) no cabeçalho.
// ---------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vlab-token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, 
  (error) => Promise.reject(error)
);

// ---------------------------------------------------------
// Padrão Repository: Abstração dos Endpoints HTTP
// ---------------------------------------------------------
export const authApi = {
  // FastAPI OAuth2 exige que os dados de login sejam enviados como formulário URL Encoded
  login: (email: string, password: string) => {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);
    return api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  },
  // Rota de registro de novos usuários
  register: (data: any) => api.post('/auth/register', data),
};

export const materialApi = {
  list: (page: number = 1, size: number = 5, search: string = '', type: string = '') => {
    let url = `/materials/?page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;
    return api.get(url);
  },
  getMetrics: () => api.get('/materials/metrics'),
  create: (data: any) => api.post('/materials/', data),
  delete: (id: number) => api.delete(`/materials/${id}`),
  smartAssist: (title: string, resource_type: string) => 
    api.post('/smart-assist/', { title, resource_type }),
};

export default api;