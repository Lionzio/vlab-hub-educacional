// Contrato base do recurso didático.
export interface Material {
  id?: number;
  title: string;
  description?: string;
  resource_type: string;
  url: string;
  tags?: string;
}

// Contrato Sênior: Estrutura rigorosa esperada do backend ao solicitar paginação
export interface PaginatedMaterialResponse {
  items: Material[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
}

// Contrato Sênior: Tipagem estrita para as métricas agregadas do Dashboard
export interface DashboardMetrics {
  total_materials: number;
  video_count: number;
  pdf_count: number;
  link_count: number;
}

// Novos Contratos de Autenticação Sênior (JWT e RBAC)
export interface User {
  email: string;
  role: 'aluno' | 'conteudista';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: 'aluno' | 'conteudista';
}