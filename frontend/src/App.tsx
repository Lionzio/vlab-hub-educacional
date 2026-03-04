import { BookOpen } from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';

function App() {
  // O App não sabe de onde vêm os dados, ele só consome o Hook (Inversão de Controle)
  const { 
    materials, loading, currentPage, totalPages, 
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist 
  } = useMaterials();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <BookOpen size={32} color="#4f46e5" />
        <h1 style={{ color: '#111827' }}>V-Lab Hub Educacional</h1>
      </header>

      {/* Injeção de dependências no Formulário */}
      <MaterialForm 
        onSave={saveMaterial} 
        onSmartAssist={getSmartAssist} 
        isLoading={loading} 
      />

      {/* Injeção de dependências na Lista Paginada */}
      <MaterialList 
        materials={materials} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDelete={deleteMaterial}
      />
    </div>
  );
}

export default App;