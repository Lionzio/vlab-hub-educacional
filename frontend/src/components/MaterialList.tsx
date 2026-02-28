interface MaterialListProps {
  materials: any[];
}

export default function MaterialList({ materials }: MaterialListProps) {
  if (materials.length === 0) {
    return (
      <section style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
        <p>Nenhum material cadastrado ainda. Use o formulário acima para começar!</p>
      </section>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: '20px' }}>Materiais no Hub ({materials.length})</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {materials.map((res: any) => (
          <div key={res.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', borderLeft: '5px solid #4f46e5', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#111827' }}>{res.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 10px 0' }}>{res.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ background: '#eef2ff', color: '#4338ca', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                {res.resource_type}
              </span>
              <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#4f46e5', textDecoration: 'none' }}>
                Acessar Material &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}