import { useState, useEffect } from 'react';
import { Sparkles, PlusCircle, BookOpen, Trash2, Video, FileText, Globe } from 'lucide-react';
import { resourceApi } from './api';

function App() {
  const [resources, setResources] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Vídeo');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  // Carrega a lista ao abrir a página
  useEffect(() => { loadResources(); }, []);

  const loadResources = async () => {
    try {
      const response = await resourceApi.list();
      setResources(response.data);
    } catch (error) { console.error("Erro ao listar:", error); }
  };

  const handleSmartAssist = async () => {
    if (!title) return alert("Digite um título!");
    setLoading(true);
    try {
      const response = await resourceApi.smartAssist(title, type);
      setDescription(response.data.description);
      setTags(response.data.tags);
    } catch (error) { alert("Erro na IA"); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    try {
      await resourceApi.create({ title, description, resource_type: type, tags, url: "http://exemplo.com" });
      alert("Salvo com sucesso!");
      setTitle(''); setDescription(''); setTags('');
      loadResources(); // Atualiza a lista
    } catch (error) { alert("Erro ao salvar"); }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <BookOpen size={32} color="#4f46e5" />
        <h1 style={{ color: '#111827' }}>Voxar Hub Educacional</h1>
      </header>

      <section style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Cadastrar Novo Material</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
          
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            <option>Vídeo</option><option>PDF</option><option>Artigo</option><option>Link Externo</option>
          </select>

          <button onClick={handleSmartAssist} disabled={loading} style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {loading ? 'Consultando IA...' : <><Sparkles size={18} /> Smart Assist</>}
          </button>

          <textarea placeholder="Descrição gerada pela IA..." value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
          <input placeholder="Tags" value={tags} onChange={(e) => setTags(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
          
          <button onClick={handleSave} style={{ background: '#10b981', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Salvar Material
          </button>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px' }}>Materiais no Hub ({resources.length})</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {resources.map((res: any) => (
            <div key={res.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', borderLeft: '5px solid #4f46e5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{res.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 10px 0' }}>{res.description}</p>
              <span style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{res.resource_type}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;