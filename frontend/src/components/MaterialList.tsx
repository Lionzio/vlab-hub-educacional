import type { Material } from '../types';
import { MaterialCard } from './MaterialCard';

interface MaterialListProps {
  materials: Material[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
}

export default function MaterialList({ materials, currentPage, totalPages, onPageChange, onDelete }: MaterialListProps) {
  // Edge Case: Banco de dados vazio
  if (materials.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        <p>Nenhum material cadastrado no momento. Adicione o primeiro acima!</p>
      </section>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: '20px', color: '#111827' }}>Materiais no Hub</h2>
      
      {/* DRY: Renderização Iterativa e Mapeada */}
      <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
        {materials.map((res) => (
          <MaterialCard key={res.id} material={res} onDelete={onDelete} />
        ))}
      </div>

      {/* Controles Dinâmicos de Paginação */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === 1 ? '#d1d5db' : '#4f46e5', color: 'white', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          &larr; Anterior
        </button>
        
        <span style={{ color: '#4b5563', fontWeight: 500 }}>
          Página {currentPage} de {totalPages}
        </span>
        
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === totalPages ? '#d1d5db' : '#4f46e5', color: 'white', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          Próxima &rarr;
        </button>
      </div>
    </section>
  );
}