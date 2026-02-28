// Correção: Usando 'import type'
import type { Material } from '../types';
import { MaterialCard } from './MaterialCard';

interface MaterialListProps {
  materials: Material[];
}

export default function MaterialList({ materials }: MaterialListProps) {
  if (materials.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        <p>Nenhum material cadastrado ainda. Use o formulário acima para começar!</p>
      </section>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: '20px', color: '#111827' }}>Materiais no Hub ({materials.length})</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {materials.map((res) => (
          <MaterialCard key={res.id} material={res} />
        ))}
      </div>
    </section>
  );
}