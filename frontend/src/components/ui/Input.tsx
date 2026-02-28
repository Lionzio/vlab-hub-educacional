import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

const sharedStyle = { 
  padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', 
  width: '100%', boxSizing: 'border-box' as const, fontFamily: 'inherit'
};

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input style={sharedStyle} {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea style={sharedStyle} {...props} />;
}