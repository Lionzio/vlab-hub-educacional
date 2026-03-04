import { BookOpen, Moon, Sun, LogOut } from 'lucide-react';
import { useMaterials } from './hooks/useMaterials';
import { useTheme } from './hooks/useTheme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';
import MaterialForm from './components/MaterialForm';
import MaterialList from './components/MaterialList';
import { MaterialFilter } from './components/MaterialFilter';
import { Dashboard } from './components/Dashboard';

// O conteúdo real do App, isolado para poder usar o Hook useAuth
function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const { 
    materials, metrics, loading, currentPage, totalPages, searchQuery, filterType,
    setCurrentPage, saveMaterial, deleteMaterial, getSmartAssist, applyFilters
  } = useMaterials();

  // 🛡️ Guarda-Costas Frontend: Se não tem token, exibe a tela de Login!
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen size={32} color="var(--accent)" />
          <h1 style={{ color: 'var(--text-main)', fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>V-Lab Hub</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Olá, <strong>{user?.email}</strong> ({user?.role})
          </span>
          <button onClick={toggleTheme} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }} title="Mudar Tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={logout} style={{ background: '#ef4444', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} title="Sair do Sistema">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <Dashboard metrics={metrics} />

      {/* RBAC: O formulário de cadastro SÓ APARECE para os conteudistas */}
      {user?.role === 'conteudista' && (
        <MaterialForm onSave={saveMaterial} onSmartAssist={getSmartAssist} isLoading={loading} />
      )}

      <MaterialFilter onApplyFilters={applyFilters} currentSearch={searchQuery} currentType={filterType} />

      <MaterialList 
        materials={materials} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onDelete={deleteMaterial}
        userRole={user?.role || 'aluno'}
      />
    </div>
  );
}

// O App raiz apenas envelopa a aplicação com o Provedor de Autenticação Global
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}