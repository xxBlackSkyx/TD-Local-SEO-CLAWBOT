'use client';
import Layout from '@/components/Layout';

const ACTIONS = [
  {
    group: 'Telegram Commands',
    items: [
      { label: 'New Audit', cmd: '/audit name="Business Name" url=domain.com', icon: '🔍', desc: 'Full SEO + GBP audit with 4-week plan' },
      { label: 'Check Status', cmd: '/status', icon: '⚡', desc: 'System snapshot — all services + stats' },
      { label: 'Hot Leads', cmd: '/hotleads', icon: '🔥', desc: 'Show leads with high engagement' },
      { label: 'Email Stats', cmd: '/emailstats', icon: '📧', desc: 'Campaign overview in Telegram' },
      { label: 'Post to FB Now', cmd: '/fbpost', icon: '📱', desc: 'Trigger an immediate Facebook post' },
      { label: 'GBP Audit', cmd: '/gbp businessname city', icon: '📍', desc: 'Google Business Profile check' },
      { label: 'Citation Audit', cmd: '/cite domain.com', icon: '📋', desc: 'Check NAP consistency across directories' },
      { label: 'Backlink Audit', cmd: '/links domain.com', icon: '🔗', desc: 'Check backlink profile' },
      { label: 'Content Plan', cmd: '/plan businessname', icon: '📅', desc: 'Generate 4-week content strategy' },
    ],
  },
  {
    group: 'How to Onboard a Client',
    items: [
      { label: 'Start Onboard', cmd: '/onboard name="Business Name" url=domain.com', icon: '🚀', desc: 'Full audit + Zoho CRM deal + 4-week plan in one command' },
    ],
  },
];

export default function Actions() {
  const copyCmd = (cmd: string) => {
    navigator.clipboard.writeText(cmd).catch(() => {});
  };

  return (
    <Layout active="/actions">
      <div className="page-header">
        <h1>Actions</h1>
        <p className="subtitle">Reference for all Telegram commands — tap to copy</p>
      </div>

      {ACTIONS.map(group => (
        <div key={group.group} className="group">
          <div className="group-title">{group.group}</div>
          <div className="cmd-grid">
            {group.items.map(item => (
              <button key={item.label} className="cmd-card" onClick={() => copyCmd(item.cmd)}>
                <div className="cmd-top">
                  <span className="cmd-icon">{item.icon}</span>
                  <span className="cmd-label">{item.label}</span>
                </div>
                <code className="cmd-code">{item.cmd}</code>
                <div className="cmd-desc">{item.desc}</div>
                <div className="copy-hint">tap to copy</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .page-header { margin-bottom: 32px; }
        h1 { font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 4px 0; }
        .subtitle { font-size: 13px; color: #6b7280; margin: 0; }
        .group { margin-bottom: 32px; }
        .group-title {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }
        .cmd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }
        .cmd-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
        }
        .cmd-card:hover {
          border-color: #6c47ff;
          background: #1e1040;
        }
        .cmd-card:hover .copy-hint { opacity: 1; }
        .cmd-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cmd-icon { font-size: 18px; }
        .cmd-label { font-size: 14px; font-weight: 600; color: #fff; }
        .cmd-code {
          font-family: monospace;
          font-size: 11px;
          color: #8b5cf6;
          background: #0f0f1a;
          padding: 6px 8px;
          border-radius: 6px;
          word-break: break-all;
          white-space: pre-wrap;
        }
        .cmd-desc { font-size: 12px; color: #6b7280; line-height: 1.4; }
        .copy-hint {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 10px;
          color: #6c47ff;
          opacity: 0;
          transition: opacity 0.15s;
        }
      `}</style>
    </Layout>
  );
}
