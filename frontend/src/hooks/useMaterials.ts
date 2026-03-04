import { useState, useEffect, useCallback } from 'react';
import { materialApi } from '../api';
import type { Material } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estados de Controle da Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // useCallback: Impede recriação infinita da função a cada renderização do React
  const fetchMaterials = useCallback(async (page: number = 1) => {
    try {
      const { data } = await materialApi.list(page, 5); // Buscando 5 itens por vez
      setMaterials(data.items);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("[Backend Error] Falha ao buscar materiais:", error);
    }
  }, []);

  // Monitora a página atual e refaz a busca sempre que ela mudar
  useEffect(() => { 
    fetchMaterials(currentPage); 
  }, [fetchMaterials, currentPage]);

  const saveMaterial = async (materialData: Material) => {
    try {
      await materialApi.create(materialData);
      // UX Avançada: Ao salvar um item novo, força a interface a voltar para a página 1
      await fetchMaterials(1); 
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao salvar material:", error);
      alert("Ocorreu um erro ao salvar o material. Verifique sua conexão.");
      return false;
    }
  };

  const deleteMaterial = async (id: number) => {
    try {
      await materialApi.delete(id);
      
      // UX Avançada: Se o usuário apagar o último item da página atual, 
      // ele recua uma página automaticamente para não ver uma tela em branco.
      if (materials.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        await fetchMaterials(currentPage); 
      }
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao deletar material:", error);
      alert("Ocorreu um erro ao deletar o material.");
      return false;
    }
  };

  const getSmartAssist = async (title: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await materialApi.smartAssist(title, type);
      return data;
    } catch (error: any) {
      // Defesa contra o Timeout configurado no api.ts
      if (error.code === 'ECONNABORTED') {
        alert("A Inteligência Artificial demorou muito para responder. Tente novamente.");
      } else {
        alert("Erro ao contatar o Assistente Inteligente.");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Retorna a "API Interna" do Hook para os componentes
  return { 
    materials, 
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    saveMaterial, 
    deleteMaterial, 
    getSmartAssist 
  };
}