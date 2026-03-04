import type { DashboardMetrics } from '../types';

interface DashboardProps {
  metrics: DashboardMetrics | null;
}

export function Dashboard({ metrics }: DashboardProps) {
  // Programação Defensiva: Se o backend falhar ou ainda estiver carregando,
  // não renderiza nada e evita quebrar o React (White Screen of Death).
  if (!metrics) return null;

  // Componente atômico interno para evitar repetição de código (DRY)
  const MetricCard = ({ title, value, color }: { title: string, value: number, color: string }) => (
    <div style={{ background: 'white', padding: '15px', borderRadius: '10px', borderTop: `4px solid ${color}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 1, minWidth: '120px', textAlign: 'center' }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </h4>
      <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>
        {value}
      </span>
    </div>
  );

  return (
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ marginBottom: '15px', color: '#111827', fontSize: '1.2rem', fontWeight: '600' }}>Visão Geral da Plataforma</h2>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <MetricCard title="Total Cadastrado" value={metrics.total_materials} color="#4f46e5" />
        <MetricCard title="Vídeos" value={metrics.video_count} color="#ef4444" />
        <MetricCard title="PDFs" value={metrics.pdf_count} color="#10b981" />
        <MetricCard title="Links" value={metrics.link_count} color="#f59e0b" />
      </div>
    </section>
  );
}