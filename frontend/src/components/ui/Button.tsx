import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'success';
  isLoading?: boolean;
}

export function Button({ children, variant = 'primary', isLoading, disabled, ...props }: ButtonProps) {
  const baseStyle = { 
    border: 'none', padding: '12px', borderRadius: '8px', 
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer', 
    fontWeight: 600, display: 'flex', justifyContent: 'center', 
    alignItems: 'center', gap: '8px', width: '100%',
    opacity: disabled || isLoading ? 0.7 : 1
  };
  
  const variants = {
    primary: { background: '#4f46e5', color: 'white' },
    success: { background: '#10b981', color: 'white' }
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant] }} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}