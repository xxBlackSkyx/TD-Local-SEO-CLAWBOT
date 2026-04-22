interface MetricsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

export default function MetricsCard({ title, value, icon, color }: MetricsCardProps) {
  return (
    <div className="card" style={{ borderLeftColor: color }}>
      <span className="icon">{icon}</span>
      <div className="content">
        <h3>{title}</h3>
        <p className="value">{value}</p>
      </div>
      <style jsx>{`
        .card {
          border-left: 4px solid;
          padding: 20px;
          border-radius: 8px;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .icon { font-size: 32px; }
        .content h3 { margin: 0; font-size: 14px; color: #666; }
        .value { margin: 5px 0 0 0; font-size: 28px; font-weight: bold; }
      `}</style>
    </div>
  );
}
