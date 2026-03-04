import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, email: string, role: 'aluno' | 'conteudista') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restaura a sessão ao recarregar a página lendo do cache do navegador
  useEffect(() => {
    const savedToken = localStorage.getItem('vlab-token');
    const savedEmail = localStorage.getItem('vlab-email');
    const savedRole = localStorage.getItem('vlab-role') as 'aluno' | 'conteudista';

    if (savedToken && savedEmail && savedRole) {
      setToken(savedToken);
      setUser({ email: savedEmail, role: savedRole });
    }
  }, []);

  const login = (newToken: string, email: string, role: 'aluno' | 'conteudista') => {
    setToken(newToken);
    setUser({ email, role });
    localStorage.setItem('vlab-token', newToken);
    localStorage.setItem('vlab-email', email);
    localStorage.setItem('vlab-role', role);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('vlab-token');
    localStorage.removeItem('vlab-email');
    localStorage.removeItem('vlab-role');
    
    // Força o reload da página para limpar cache de memória de forma agressiva
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado para consumir o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};