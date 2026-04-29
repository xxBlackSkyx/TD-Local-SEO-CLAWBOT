export default function ServiceDot({
  name,
  up,
  large,
}: {
  name: string;
  up: boolean | undefined;
  large?: boolean;
}) {
  const status = up === undefined ? 'loading' : up ? 'up' : 'down';
  return (
    <div className={`dot-wrap ${large ? 'large' : ''}`}>
      <span className={`dot ${status}`} />
      <span className="name">{name}</span>
      <style jsx>{`
        .dot-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot.up { background: #10b981; }
        .dot.down { background: #ef4444; animation: urgent 1s infinite; }
        .dot.loading { background: #6b7280; }
        .name {
          font-size: 12px;
          color: #9ca3af;
          white-space: nowrap;
          text-transform: capitalize;
        }
        .large .dot { width: 12px; height: 12px; }
        .large .name { font-size: 14px; font-weight: 600; color: #d1d5db; }
        @keyframes urgent {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
