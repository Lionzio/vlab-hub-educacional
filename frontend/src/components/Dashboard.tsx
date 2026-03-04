import type { DashboardMetrics } from '../types';

interface DashboardProps {
  metrics: DashboardMetrics | null;
}

export function Dashboard({ metrics }: DashboardProps) {
  if (!metrics) return null;

  const MetricCard = ({ title, value, color }: { title: string, value: number, color: string }) => (
    <div style={{ background: 'var(--bg-card)', padding: '15px', borderRadius: '10px', borderTop: `4px solid ${color}`, boxShadow: '0 1px 2px rgba(0,0,0,0.05)', flex: 1, minWidth: '120px', textAlign: 'center', transition: 'all 0.3s ease' }}>
      <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase' }}>{title}</h4>
      <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{value}</span>
    </div>
  );

  return (
    <section style={{ marginBottom: '30px' }}>
      <h2 style={{ marginBottom: '15px', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '600' }}>Visão Geral da Plataforma</h2>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <MetricCard title="Total Cadastrado" value={metrics.total_materials} color="#4f46e5" />
        <MetricCard title="Vídeos" value={metrics.video_count} color="#ef4444" />
        <MetricCard title="PDFs" value={metrics.pdf_count} color="#10b981" />
        <MetricCard title="Links" value={metrics.link_count} color="#f59e0b" />
      </div>
    </section>
  );
}