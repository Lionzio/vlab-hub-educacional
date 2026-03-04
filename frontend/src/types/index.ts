// Contrato base do recurso didático. 
// O 'id' é opcional (?) porque na hora de criar, ele ainda não existe.
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