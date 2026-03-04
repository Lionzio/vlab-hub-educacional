import { useState } from 'react';

interface MaterialFilterProps {
  onApplyFilters: (search: string, type: string) => void;
  currentSearch: string;
  currentType: string;
}

export function MaterialFilter({ onApplyFilters, currentSearch, currentType }: MaterialFilterProps) {
  // Estado local para o formulário antes de enviar a busca
  const [localSearch, setLocalSearch] = useState(currentSearch);
  const [localType, setLocalType] = useState(currentType);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(localSearch, localType);
  };

  const handleClear = () => {
    setLocalSearch('');
    setLocalType('');
    onApplyFilters('', '');
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <input 
        type="text" 
        placeholder="Buscar por título ou tag..." 
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
      />
      
      <select 
        value={localType}
        onChange={(e) => setLocalType(e.target.value)}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white' }}
      >
        <option value="">Todos os Tipos</option>
        <option value="Vídeo">Vídeo</option>
        <option value="PDF">PDF</option>
        <option value="Link">Link</option>
      </select>

      <button type="submit" style={{ padding: '10px 15px', borderRadius: '6px', background: '#4f46e5', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        Buscar
      </button>

      {(currentSearch || currentType) && (
        <button type="button" onClick={handleClear} style={{ padding: '10px 15px', borderRadius: '6px', background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', cursor: 'pointer' }}>
          Limpar
        </button>
      )}
    </form>
  );
}