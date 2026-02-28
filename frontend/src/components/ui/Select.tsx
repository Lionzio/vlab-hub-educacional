import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export function Select({ options, ...props }: SelectProps) {
  return (
    <select style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box' as const }} {...props}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}