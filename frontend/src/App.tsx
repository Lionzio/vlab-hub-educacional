import { BookOpen } from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import { MaterialFilter } from './components/MaterialFilter';
import { Dashboard } from './components/Dashboard';

function App() {
  const { 
    materials, metrics, loading, currentPage, totalPages, searchQuery, filterType,
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist, applyFilters
  } = useMaterials();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
        <BookOpen size={32} color="#4f46e5" />
        <h1 style={{ color: '#111827', fontSize: '2rem', fontWeight: 'bold' }}>V-Lab Hub Educacional</h1>
      </header>

      {/* Nosso novo Dashboard injetado no topo (Visão Estratégica) */}
      <Dashboard metrics={metrics} />

      <MaterialForm 
        onSave={saveMaterial} 
        onSmartAssist={getSmartAssist} 
        isLoading={loading} 
      />

      <MaterialFilter 
        onApplyFilters={applyFilters} 
        currentSearch={searchQuery}
        currentType={filterType}
      />

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