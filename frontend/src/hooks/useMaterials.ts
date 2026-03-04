import { useState, useEffect } from 'react';
import { materialApi } from '../api';
import type { Material } from '../types';

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar a lista do banco
  const fetchMaterials = async () => {
    try {
      const { data } = await materialApi.list();
      setMaterials(data);
    } catch (error) {
      console.error("[Backend Error] Falha ao buscar materiais:", error);
    }
  };

  // Carrega os dados quando a aplicação inicia
  useEffect(() => { 
    fetchMaterials(); 
  }, []);

  // Função para salvar no banco
  const saveMaterial = async (materialData: Material) => {
    try {
      await materialApi.create(materialData);
      await fetchMaterials(); // Atualiza a lista após salvar
      return true;
    } catch (error) {
      console.error("[Backend Error] Falha ao salvar material:", error);
      alert("Ocorreu um erro ao salvar o material. Verifique sua conexão.");
      return false;
    }
  };

  // Função para chamar o Gemini com tratamento rigoroso de erros e timeout
  const getSmartAssist = async (title: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await materialApi.smartAssist(title, type);
      return data; // Retorna o JSON com { description, tags }
    } catch (error: any) {
      // Programação Defensiva: Identifica se a falha foi por tempo excedido (Timeout)
      if (error.code === 'ECONNABORTED') {
        alert("A Inteligência Artificial demorou muito para responder. Tente novamente.");
      } else {
        alert("Erro ao contatar o Assistente Inteligente. Tente novamente mais tarde.");
      }
      console.error("[AI Error]:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { materials, loading, saveMaterial, getSmartAssist };
}