import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../api';
import { BookOpen } from 'lucide-react';

export function LoginForm() {
  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'aluno' | 'conteudista'>('aluno');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegistering) {
        // Passo 1: Registra o usuário no banco
        await authApi.register({ email, password, role });
        
        // Passo 2: UX de Excelência (Auto-Login)
        // Faz o login logo em seguida para o usuário não ter que digitar a senha de novo.
        const { data } = await authApi.login(email, password);
        login(data.access_token, email, data.role);
      } else {
        // Fluxo normal de login
        const { data } = await authApi.login(email, password);
        login(data.access_token, email, data.role);
      }
    } catch (error: any) {
      // Captura e exibe o erro exato devolvido pelo FastAPI
      const backendError = error.response?.data?.detail;
      
      // Se for um array, significa que o schema do Pydantic bloqueou a validação
      if (Array.isArray(backendError)) {
        alert("Por favor, preencha todos os campos corretamente.");
      } else {
        alert(backendError || "Erro de conexão. Verifique seus dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função isolada para evitar submissões de formulário acidentais
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    // Limpa os campos ao trocar de modo para evitar confusão de estado
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', border: '1px solid var(--border-color)', transition: 'all 0.3s ease' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <BookOpen size={48} color="var(--accent)" style={{ marginBottom: '10px' }} />
          <h2 style={{ color: 'var(--text-main)', margin: 0 }}>V-Lab Hub</h2>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0', textAlign: 'center' }}>
            {isRegistering ? "Crie sua conta no acervo" : "Faça login para acessar o acervo"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }} 
          />
          
          {isRegistering && (
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as any)} 
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-main)' }}
            >
              <option value="aluno">Sou Aluno (Apenas Leitura)</option>
              <option value="conteudista">Sou Conteudista (Edição Completa)</option>
            </select>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            style={{ padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}
          >
            {loading ? 'Processando...' : (isRegistering ? 'Criar Conta' : 'Entrar')}
          </button>
        </form>

        <button 
          type="button" /* 🛡️ FUNDAMENTAL: Evita que o React dispare o Submit do Form! */
          onClick={toggleMode} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', width: '100%', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Já tenho uma conta. Fazer Login.' : 'Não tem conta? Registre-se aqui.'}
        </button>
      </div>
    </div>
  );
}