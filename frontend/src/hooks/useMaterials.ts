import { useState, useEffect, useCallback } from 'react';
import { materialApi } from '../api';
import type { Material } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Controle de Paginação e Filtros
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
  }, [searchQuery, filterType]); // Dependências do Callback

  useEffect(() => { 
    fetchMaterials(currentPage); 
  }, [fetchMaterials, currentPage]);

  // Função dedicada para aplicar filtros e resetar a paginação
  const applyFilters = (search: string, type: string) => {
    setSearchQuery(search);
    setFilterType(type);
    setCurrentPage(1); // UX Sênior: Sempre volta pra pág 1 ao pesquisar
    fetchMaterials(1, search, type);
  };

  const saveMaterial = async (materialData: Material) => {
    try {
      await materialApi.create(materialData);
      applyFilters('', ''); // Limpa os filtros ao salvar um novo para que o usuário consiga vê-lo
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
    materials, loading, currentPage, totalPages, searchQuery, filterType,
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist, applyFilters 
  };
}