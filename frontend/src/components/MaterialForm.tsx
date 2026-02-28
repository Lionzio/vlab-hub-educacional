import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Input, TextArea } from './ui/Input';
import { Select } from './ui/Select';
// Correção Sênior: Usando 'import type' para que o Vite saiba que isso não é código JavaScript executável
import type { Material } from '../types';

interface MaterialFormProps {
  onSave: (material: Material) => Promise<boolean>;
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
      <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#111827' }}>Cadastrar Novo Material</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Input placeholder="Título (ex: Revolução Industrial)" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <Select options={['Vídeo', 'PDF', 'Artigo', 'Link Externo']} value={type} onChange={(e) => setType(e.target.value)} />
        
        <Input placeholder="URL do Material (ex: https://...)" value={url} onChange={(e) => setUrl(e.target.value)} />

        <Button onClick={handleSmartAssistClick} isLoading={isLoading} variant="primary">
          <Sparkles size={18} /> Preencher com Smart Assist
        </Button>

        <TextArea placeholder="Descrição (Gerada pela IA ou manual)" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        
        <Input placeholder="Tags (separadas por vírgula)" value={tags} onChange={(e) => setTags(e.target.value)} />
        
        <Button onClick={handleSaveClick} variant="success">
          Salvar Material
        </Button>
      </div>
    </section>
  );
}