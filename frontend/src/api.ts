import axios from 'axios';

// ---------------------------------------------------------
// Configuração Dinâmica e Segura da Base URL
// ---------------------------------------------------------
const api = axios.create({
  // Tenta ler a URL da API da nuvem. Se não existir (local), usa o '/api' do Vite
  baseURL: import.meta.env.VITE_API_URL || '/api',
  
  // Blindagem Arquitetural: Timeout de 15 segundos.
  // Evita que a interface congele (loading infinito) se o backend 
  // ou a IA demorarem a responder devido a instabilidades de rede.
  timeout: 15000, 
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