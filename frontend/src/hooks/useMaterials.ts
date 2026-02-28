import { useState, useEffect } from 'react';
import { materialApi } from '../api';

export function useMaterials() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar a lista do banco
  const fetchMaterials = async () => {
    try {
      const { data } = await materialApi.list();
      setMaterials(data);
    } catch (error) {
      console.error("Erro ao buscar materiais:", error);
    }
  };

  // Carrega os dados quando a aplicação inicia
  useEffect(() => { 
    fetchMaterials(); 
  }, []);

  // Função para salvar no banco
  const saveMaterial = async (materialData: any) => {
    try {
      await materialApi.create(materialData);
      await fetchMaterials(); // Atualiza a lista após salvar
      return true;
    } catch (error) {
      console.error("Erro ao salvar:", error);
      return false;
    }
  };

  // Função para chamar o Gemini
  const getSmartAssist = async (title: string, type: string) => {
    setLoading(true);
    try {
      const { data } = await materialApi.smartAssist(title, type);
      return data; // Retorna o JSON com { description, tags }
    } catch (error) {
      console.error("Erro na IA:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { materials, loading, saveMaterial, getSmartAssist };
}