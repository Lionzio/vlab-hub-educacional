import { useState } from 'react';

interface MaterialFilterProps {
  onApplyFilters: (search: string, type: string) => void;
  currentSearch: string;
  currentType: string;
}

export function MaterialFilter({ onApplyFilters, currentSearch, currentType }: MaterialFilterProps) {
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
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px', background: 'var(--bg-card)', padding: '15px', borderRadius: '10px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}>
      <input 
        type="text" 
        placeholder="Buscar por título ou tag..." 
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
      />
      
      <select 
        value={localType}
        onChange={(e) => setLocalType(e.target.value)}
        style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
      >
        <option value="">Todos os Tipos</option>
        <option value="Vídeo">Vídeo</option>
        <option value="PDF">PDF</option>
        <option value="Link">Link</option>
      </select>

      <button type="submit" style={{ padding: '10px 15px', borderRadius: '6px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        Buscar
      </button>

      {(currentSearch || currentType) && (
        <button type="button" onClick={handleClear} style={{ padding: '10px 15px', borderRadius: '6px', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
          Limpar
        </button>
      )}
    </form>
  );
}