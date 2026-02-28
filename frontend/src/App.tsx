import { BookOpen } from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';

function App() {
  // Toda a lógica complexa foi abstraída para dentro do nosso Custom Hook!
  const { materials, loading, saveMaterial, getSmartAssist } = useMaterials();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <BookOpen size={32} color="#4f46e5" />
        <h1 style={{ color: '#111827' }}>V-Lab Hub Educacional</h1>
      </header>

      {/* Injetamos as funções e o estado via Props */}
      <MaterialForm 
        onSave={saveMaterial} 
        onSmartAssist={getSmartAssist} 
        isLoading={loading} 
      />

      {/* Injetamos apenas os dados da lista */}
      <MaterialList materials={materials} />
    </div>
  );
}

export default App;