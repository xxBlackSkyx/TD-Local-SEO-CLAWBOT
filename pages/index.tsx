'use client';
import { useEffect, useState, useCallback } from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import ServiceDot from '@/components/ServiceDot';



export default function Overview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/ec2/stats`);
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      // silently retry
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const t = setInterval(fetchData, 30000);
    return () => clearInterval(t);
  }, [fetchData]);

  const allUp = data && Object.values(data.services).every(Boolean);
  const servicesUp = data ? Object.values(data.services).filter(Boolean).length : 0;

  return (
    <Layout active="/">
      <div className="page-header">
        <div>
          <h1>Command Center</h1>
          <p className="subtitle">TD Local SEO — Palm Coast, FL</p>
        </div>
        <div className="live-badge">
          <span className={`pulse-dot ${allUp ? 'green' : 'yellow'}`} />
          <span>{loading ? 'Connecting...' : `LIVE · ${lastUpdated}`}</span>
        </div>
      </div>

      {/* Service Health Bar */}
      <div className="service-bar">
        <span className="bar-label">System Health</span>
        <div className="services-row">
          {data && Object.entries(data.services).map(([name, up]: [string, any]) => (
            <ServiceDot key={name} name={name.replace(/_/g, ' ')} up={up} />
          ))}
        </div>
        <span className="bar-count">{servicesUp}/5 services</span>
      </div>

      {/* Email KPIs */}
      <h2 className="section-title">📧 Email Campaign</h2>
      <div className="grid-4">
        <StatCard
          label="Total Sent"
          value={data?.email.total_sent ?? '—'}
          icon="📤"
          color="blue"
          sub={`${data?.email.sent_today ?? 0} today`}
        />
        <StatCard
          label="Sent / Hour"
          value={data?.email.sent_last_hour ?? '—'}
          icon="⚡"
          color="purple"
          sub="last 60 min"
        />
        <StatCard
          label="Open Rate"
          value={data ? `${data.email.open_rate}%` : '—'}
          icon="👀"
          color="green"
          sub={`${data?.email.total_opens ?? 0} opens`}
        />
        <StatCard
          label="Reply Rate"
          value={data ? `${data.email.reply_rate}%` : '—'}
          icon="💬"
          color="orange"
          sub={`${data?.email.total_replies ?? 0} replies`}
        />
      </div>

      {/* Pipeline */}
      <h2 className="section-title">🎯 Pipeline</h2>
      <div className="grid-4">
        <StatCard
          label="Total Leads"
          value={data?.leads.total ?? '—'}
          icon="🧲"
          color="purple"
        />
        <StatCard
          label="Emailed"
          value={data?.leads.emailed ?? '—'}
          icon="✅"
          color="green"
          sub={`${data?.leads.remaining ?? 0} remaining`}
        />
        <StatCard
          label="Replied"
          value={data?.leads.replied ?? '—'}
          icon="🔥"
          color="orange"
        />
        <StatCard
          label="Audits Run"
          value={data?.audits.total ?? '—'}
          icon="🔍"
          color="blue"
          sub={`${data?.audits.today ?? 0} today`}
        />
      </div>

      {/* Facebook */}
      <h2 className="section-title">📱 Facebook Autopilot</h2>
      <div className="fb-row">
        <div className="fb-card">
          <div className="fb-number">{data?.facebook.posts_today ?? '—'}</div>
          <div className="fb-label">Posts Today</div>
        </div>
        <div className="fb-status-card">
          <ServiceDot name="FB Autopilot" up={data?.services.fb_autopilot} large />
          <p>Auto-posting 1–3x daily. Text-only, day-themed content.</p>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        h1 {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px 0;
        }
        .subtitle {
          color: #6b7280;
          font-size: 14px;
        }
        .live-badge {
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
        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 2s infinite;
        }
        .pulse-dot.green { background: #10b981; }
        .pulse-dot.yellow { background: #f59e0b; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .service-bar {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .bar-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .services-row {
          display: flex;
          gap: 12px;
          flex: 1;
          flex-wrap: wrap;
        }
        .bar-count {
          font-size: 13px;
          color: #10b981;
          font-weight: 600;
          white-space: nowrap;
        }
        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 16px 0;
        }
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }
        .fb-row {
          display: grid;
          grid-template-columns: 160px 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        .fb-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .fb-number {
          font-size: 48px;
          font-weight: 700;
          color: #6c47ff;
          line-height: 1;
        }
        .fb-label {
          font-size: 12px;
          color: #6b7280;
          margin-top: 8px;
        }
        .fb-status-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          justify-content: center;
        }
        .fb-status-card p {
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </Layout>
  );
}
