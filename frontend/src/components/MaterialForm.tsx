import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface MaterialFormProps {
  onSave: (material: any) => Promise<boolean>;
  onSmartAssist: (title: string, type: string) => Promise<any>;
  isLoading: boolean;
}

export default function MaterialForm({ onSave, onSmartAssist, isLoading }: MaterialFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Vídeo');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [url, setUrl] = useState('');

  const handleSmartAssistClick = async () => {
    if (!title) return alert("Digite um título primeiro!");
    
    const aiData = await onSmartAssist(title, type);
    if (aiData) {
      setDescription(aiData.description);
      setTags(aiData.tags);
    }
  };

  const handleSaveClick = async () => {
    if (!title || !url) return alert("Título e URL são obrigatórios!");

    const success = await onSave({ title, description, resource_type: type, tags, url });
    if (success) {
      alert("Material salvo com sucesso!");
      setTitle(''); setDescription(''); setTags(''); setUrl('');
    }
  };

  return (
    <section style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Cadastrar Novo Material</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input placeholder="Título (ex: Revolução Industrial)" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
          <option>Vídeo</option><option>PDF</option><option>Artigo</option><option>Link Externo</option>
        </select>

        <input placeholder="URL do Material (ex: https://youtube.com/...)" value={url} onChange={(e) => setUrl(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />

        <button onClick={handleSmartAssistClick} disabled={isLoading} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {isLoading ? 'Consultando IA...' : <><Sparkles size={18} /> Preencher com Smart Assist</>}
        </button>

        <textarea placeholder="Descrição (Gerada pela IA ou manual)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        
        <input placeholder="Tags (separadas por vírgula)" value={tags} onChange={(e) => setTags(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        
        <button onClick={handleSaveClick} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          Salvar Material
        </button>
      </div>
    </section>
  );
}