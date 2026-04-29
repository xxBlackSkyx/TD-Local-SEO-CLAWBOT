const COLORS: Record<string, { bg: string; border: string; accent: string }> = {
  blue:   { bg: '#0f1e35', border: '#1e3a5f', accent: '#3b82f6' },
  green:  { bg: '#0a2318', border: '#14532d', accent: '#10b981' },
  purple: { bg: '#1a0f35', border: '#3b1f6f', accent: '#8b5cf6' },
  orange: { bg: '#1f1008', border: '#7c2d12', accent: '#f59e0b' },
  red:    { bg: '#1f0a0a', border: '#7f1d1d', accent: '#ef4444' },
};

export default function StatCard({
  label,
  value,
  icon,
  color = 'blue',
  sub,
}: {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  sub?: string;
}) {
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className="card">
      <div className="top">
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
      </div>
      <div className="value">{value}</div>
      {sub && <div className="sub">{sub}</div>}
      <style jsx>{`
        .card {
          background: ${c.bg};
          border: 1px solid ${c.border};
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .top {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon { font-size: 18px; }
        .label {
          font-size: 12px;
          font-weight: 500;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .value {
          font-size: 36px;
          font-weight: 700;
          color: ${c.accent};
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .sub {
          font-size: 12px;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
}
