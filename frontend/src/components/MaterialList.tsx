import type { Material } from '../types';
import { MaterialCard } from './MaterialCard';

interface MaterialListProps {
  materials: Material[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
  userRole: string; // <-- Prop de segurança repassada
}

export default function MaterialList({ materials, currentPage, totalPages, onPageChange, onDelete, userRole }: MaterialListProps) {
  if (materials.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        <p>Nenhum material encontrado no acervo.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: '20px', color: 'var(--text-main)' }}>Materiais no Hub</h2>
      <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
        {materials.map((res) => (
          <MaterialCard key={res.id} material={res} onDelete={onDelete} userRole={userRole} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === 1 ? 'var(--border-color)' : 'var(--accent)', color: 'white', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>&larr; Anterior</button>
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Página {currentPage} de {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === totalPages ? 'var(--border-color)' : 'var(--accent)', color: 'white', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>Próxima &rarr;</button>
      </div>
    </section>
  );
}