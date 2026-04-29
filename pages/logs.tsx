'use client';
import { useEffect, useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import ServiceDot from '@/components/ServiceDot';

export default function Logs() {
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [tick, setTick] = useState(0);

  const refresh = useCallback(async () => {
    const [s, l] = await Promise.allSettled([
      fetch('/api/ec2/stats').then(r => r.json()),
      fetch('/api/ec2/logs').then(r => r.json()),
    ]);
    if (s.status === 'fulfilled') setStats(s.value);
    if (l.status === 'fulfilled') setLogs(l.value);
    setLastUpdated(new Date().toLocaleTimeString());
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [refresh]);

  const SERVICES = [
    { key: 'bot', label: 'Telegram Bot' },
    { key: 'fb_autopilot', label: 'FB Autopilot' },
    { key: 'health_monitor', label: 'Health Monitor' },
    { key: 'disk_monitor', label: 'Disk Monitor' },
    { key: 'analytics', label: 'Analytics' },
  ];

  const allUp = stats && SERVICES.every(s => stats.services?.[s.key]);

  return (
    <Layout active="/logs">
      <div className="page-header">
        <div>
          <h1>Live Logs</h1>
          <p className="sub">Refreshes every 15 seconds</p>
        </div>
        <div className="live-pill">
          <span className={`dot ${allUp ? 'green' : 'yellow'}`} />
          {lastUpdated ? `LIVE · ${lastUpdated}` : 'Connecting...'}
        </div>
      </div>

      {/* Service Health */}
      <div className="section-title">Service Health</div>
      <div className="service-grid">
        {SERVICES.map(s => (
          <div key={s.key} className={`svc-card ${stats?.services?.[s.key] ? 'up' : 'down'}`}>
            <ServiceDot name={s.label} up={stats?.services?.[s.key]} large />
            <div className={`svc-status ${stats?.services?.[s.key] ? 'green' : 'red'}`}>
              {stats?.services?.[s.key] === undefined ? '...' : stats.services[s.key] ? 'ACTIVE' : 'DOWN'}
            </div>
          </div>
        ))}
      </div>

      {/* Email heartbeat */}
      <div className="section-title">Email Campaign</div>
      <div className="heartbeat-row">
        <div className="hb-block">
          <div className="hb-num">{stats?.email?.total_sent ?? '—'}</div>
          <div className="hb-label">Total Sent</div>
        </div>
        <div className="hb-block">
          <div className="hb-num">{stats?.email?.sent_last_hour ?? '—'}</div>
          <div className="hb-label">Last Hour</div>
        </div>
        <div className="hb-block">
          <div className="hb-num">{stats?.email?.sent_today ?? '—'}</div>
          <div className="hb-label">Today</div>
        </div>
        <div className="hb-block">
          <div className="hb-num">{stats?.leads?.remaining ?? '—'}</div>
          <div className="hb-label">Leads Left</div>
        </div>
      </div>

      {/* Log streams */}
      <div className="section-title">Log Streams</div>
      {logs.length === 0 ? (
        <div className="log-empty">Waiting for log data...</div>
      ) : (
        logs.map((stream: any) => (
          <div key={stream.file} className="log-block">
            <div className="log-header">
              <span className="log-filename">{stream.file}</span>
              <span className="log-dot" />
            </div>
            <div className="log-lines">
              {(stream.lines || []).map((line: string, i: number) => (
                <div key={i} className={`log-line ${line.includes('ERROR') || line.includes('FAIL') ? 'error' : line.includes('✅') || line.includes('OK') || line.includes('success') ? 'success' : ''}`}>
                  <span className="log-text">{line}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        h1 { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 4px 0; }
        .sub { font-size: 13px; color: #6b7280; margin: 0; }
        .live-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 12px;
          color: #9ca3af;
          font-family: monospace;
        }
        .dot {
          width: 8px; height: 8px; border-radius: 50%;
          animation: blink 1.5s infinite;
        }
        .dot.green { background: #10b981; }
        .dot.yellow { background: #f59e0b; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .section-title {
          font-size: 11px; font-weight: 600; color: #6b7280;
          text-transform: uppercase; letter-spacing: 0.08em;
          margin: 0 0 12px 0;
        }
        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 28px;
        }
        .svc-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .svc-card.down { border-color: #7f1d1d; background: #1f0a0a; }
        .svc-status {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em;
        }
        .svc-status.green { color: #10b981; }
        .svc-status.red { color: #ef4444; }
        .heartbeat-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        .hb-block {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 10px;
          padding: 16px;
          text-align: center;
        }
        .hb-num { font-size: 32px; font-weight: 700; color: #6c47ff; line-height: 1; }
        .hb-label { font-size: 12px; color: #6b7280; margin-top: 6px; }
        .log-empty {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 10px;
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .log-block {
          background: #0d0d18;
          border: 1px solid #2d2d4e;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 16px;
          font-family: monospace;
        }
        .log-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: #1a1a2e;
          border-bottom: 1px solid #2d2d4e;
        }
        .log-filename { font-size: 12px; color: #8b5cf6; font-weight: 600; }
        .log-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981; animation: blink 2s infinite;
        }
        .log-lines { padding: 12px 0; }
        .log-line {
          padding: 3px 16px;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.6;
          border-left: 2px solid transparent;
        }
        .log-line.error { color: #ef4444; border-left-color: #ef4444; background: #1a0a0a; }
        .log-line.success { color: #10b981; border-left-color: #10b981; }
        @media (max-width: 600px) {
          .heartbeat-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </Layout>
  );
}
