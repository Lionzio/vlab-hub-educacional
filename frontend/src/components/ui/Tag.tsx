interface TagProps { label: string; }

export function Tag({ label }: TagProps) {
  return (
    <span style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
      {label}
    </span>
  );
}