import { useState, useEffect, useCallback } from 'react';
import { materialApi } from '../api';
import type { Material, DashboardMetrics } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Novo Estado Global de Dashboard
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  // Estados de Controle da Paginação e Filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  // Busca os materiais paginados
  const fetchMaterials = useCallback(async (page: number = 1, search: string = searchQuery, type: string = filterType) => {
    try {
      const { data } = await materialApi.list(page, 5, search, type);
      setMaterials(data.items);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("[Backend Error] Falha ao buscar materiais:", error);
    }
  }, [searchQuery, filterType]);

  // Função Sênior para buscar as métricas do banco de forma separada
  const fetchMetrics = useCallback(async () => {
    try {
      const { data } = await materialApi.getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("[Backend Error] Falha ao buscar métricas:", error);
    }
  }, []);

  // Monitora inicialização e mudanças de página para buscar os dados
  useEffect(() => { 
    fetchMaterials(currentPage); 
    fetchMetrics(); // Busca as métricas logo que a aplicação carrega
  }, [fetchMaterials, fetchMetrics, currentPage]);

  const applyFilters = (search: string, type: string) => {
    setSearchQuery(search);
    setFilterType(type);
    setCurrentPage(1);
    fetchMaterials(1, search, type);
  };

  const saveMaterial = async (materialData: Material) => {
    try {
      await materialApi.create(materialData);
      applyFilters('', ''); // Reseta a busca para garantir que o novo material apareça
      await fetchMetrics(); // Atualiza o dashboard para somar o novo cadastro
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao salvar material:", error);
      alert("Ocorreu um erro ao salvar o material.");
      return false;
    }
  };

  const deleteMaterial = async (id: number) => {
    try {
      await materialApi.delete(id);
      if (materials.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchMaterials(currentPage); 
      }
      await fetchMetrics(); // Atualiza o dashboard para subtrair o cadastro deletado
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao deletar material:", error);
      return false;
    }
  };

  const getSmartAssist = async (title: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await materialApi.smartAssist(title, type);
      return data;
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') alert("A IA demorou muito para responder.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { 
    materials, metrics, loading, currentPage, totalPages, searchQuery, filterType,
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist, applyFilters 
  };
}