// Correção: Usando 'import type'
import type { Material } from '../types';
import { Tag } from './ui/Tag';

interface MaterialCardProps {
  material: Material;
}

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div style={{ background: 'white', padding: '15px', borderRadius: '10px', borderLeft: '5px solid #4f46e5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 5px 0', color: '#111827' }}>{material.title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 10px 0' }}>{material.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag label={material.resource_type} />
        <a href={material.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
          Acessar Material &rarr;
        </a>
      </div>
    </div>
  );
}