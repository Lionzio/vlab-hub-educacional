import type { Material } from '../types';
import { Tag } from './ui/Tag';

interface MaterialCardProps {
  material: Material;
  onDelete: (id: number) => void;
}

export function MaterialCard({ material, onDelete }: MaterialCardProps) {
  const handleDelete = () => {
    // Programação Defensiva: Confirmação antes de ação destrutiva irreversível no banco
    if (window.confirm(`Tem certeza que deseja excluir permanentemente o recurso: "${material.title}"?`)) {
      if (material.id) onDelete(material.id);
    }
  };

  return (
    <div style={{ background: 'white', padding: '15px', borderRadius: '10px', borderLeft: '5px solid #4f46e5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#111827' }}>{material.title}</h3>
        
        {/* Botão semântico de exclusão */}
        <button 
          onClick={handleDelete} 
          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}
          title="Excluir este material"
        >
          Excluir
        </button>
      </div>
      
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