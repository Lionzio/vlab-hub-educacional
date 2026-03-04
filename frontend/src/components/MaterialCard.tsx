import type { Material } from '../types';
import { Tag } from './ui/Tag';

interface MaterialCardProps {
  material: Material;
  onDelete: (id: number) => void;
  userRole: string; // <-- RBAC: Recebe o papel do usuário
}

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function MaterialCard({ material, onDelete, userRole }: MaterialCardProps) {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o recurso: "${material.title}"?`)) {
      if (material.id) onDelete(material.id);
    }
  };

  const youtubeId = material.resource_type === 'Vídeo' ? getYouTubeId(material.url) : null;

  return (
    <div style={{ background: 'var(--bg-card)', padding: '15px', borderRadius: '10px', borderLeft: '5px solid var(--accent)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
      {youtubeId && (
        <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} alt={`Capa`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', maxHeight: '250px' }} loading="lazy" />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-main)' }}>{material.title}</h3>
        
        {/* Controle de Acesso: Apenas Conteudistas veem o botão de Excluir */}
        {userRole === 'conteudista' && (
          <button onClick={handleDelete} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>Excluir</button>
        )}
      </div>
      
      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>{material.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tag label={material.resource_type} />
        <a href={material.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Acessar Material &rarr;</a>
      </div>
    </div>
  );
}