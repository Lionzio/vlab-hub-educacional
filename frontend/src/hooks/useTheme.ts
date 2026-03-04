import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Ao iniciar a aplicação, verifica se o usuário já havia escolhido um tema antes
  useEffect(() => {
    const savedTheme = localStorage.getItem('vlab-theme') as 'light' | 'dark';
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Se não escolheu, segue a preferência do sistema operacional
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Função para alternar e salvar a escolha do usuário
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('vlab-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return { theme, toggleTheme };
}