import { useState, useEffect, useCallback } from 'react';
import { materialApi } from '../api';
import toast from 'react-hot-toast'; // <-- Import Sênior
import type { Material, DashboardMetrics } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

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

  const fetchMetrics = useCallback(async () => {
    try {
      const { data } = await materialApi.getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error("[Backend Error] Falha ao buscar métricas:", error);
    }
  }, []);

  useEffect(() => { 
    fetchMaterials(currentPage); 
    fetchMetrics(); 
  }, [fetchMaterials, fetchMetrics, currentPage]);

  const applyFilters = (search: string, type: string) => {
    setSearchQuery(search);
    setFilterType(type);
    setCurrentPage(1);
    fetchMaterials(1, search, type);
  };

  const saveMaterial = async (materialData: Material) => {
    const toastId = toast.loading("Salvando recurso...");
    try {
      await materialApi.create(materialData);
      applyFilters('', ''); 
      await fetchMetrics(); 
      toast.success("Material cadastrado com sucesso!", { id: toastId });
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao salvar material:", error);
      toast.error("Ocorreu um erro ao salvar o material.", { id: toastId });
      return false;
    }
  };

  const deleteMaterial = async (id: number) => {
    const toastId = toast.loading("Deletando recurso...");
    try {
      await materialApi.delete(id);
      if (materials.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchMaterials(currentPage); 
      }
      await fetchMetrics(); 
      toast.success("Material excluído permanentemente.", { id: toastId });
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao deletar material:", error);
      toast.error("Falha ao excluir o recurso.", { id: toastId });
      return false;
    }
  };

  const getSmartAssist = async (title: string, type: string) => {
    setLoading(true);
    const toastId = toast.loading("Assistente de IA analisando...");
    try {
      const { data } = await materialApi.smartAssist(title, type);
      toast.success("Metadados gerados pela IA!", { id: toastId });
      return data;
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        toast.error("A IA demorou muito para responder.", { id: toastId });
      } else {
        toast.error("Falha na comunicação com a IA.", { id: toastId });
      }
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