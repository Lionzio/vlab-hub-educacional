import { BookOpen, Moon, Sun } from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import { useTheme } from './hooks/useTheme';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import { MaterialFilter } from './components/MaterialFilter';
import { Dashboard } from './components/Dashboard';

function App() {
  const { 
    materials, metrics, loading, currentPage, totalPages, searchQuery, filterType,
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist, applyFilters
  } = useMaterials();
  
  // Consumindo nosso Custom Hook de Tema
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={32} color="var(--accent)" />
          <h1 style={{ color: 'var(--text-main)', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
            V-Lab Hub Educacional
          </h1>
        </div>
        
        {/* Botão de Alternar Tema */}
        <button 
          onClick={toggleTheme} 
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', transition: 'all 0.3s ease' }}
          title={theme === 'light' ? "Mudar para Modo Escuro" : "Mudar para Modo Claro"}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

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