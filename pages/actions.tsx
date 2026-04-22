'use client';
import CommandButton from '@/components/CommandButton';

export default function Actions() {
  return (
    <div className="actions-page">
      <h1>🚀 Quick Actions</h1>
      <p className="subtitle">Trigger campaigns and actions from here</p>

      <div className="section">
        <h2>📧 Email Campaigns</h2>
        <div className="actions-grid">
          <CommandButton label="Send 15 Emails" icon="📧" action="send_emails" params={{ count: 15 }} />
          <CommandButton label="Send 30 Emails" icon="📧📧" action="send_emails" params={{ count: 30 }} />
          <CommandButton label="Follow-up (7 days)" icon="📮" action="follow_up" params={{ days: 7 }} />
          <CommandButton label="Follow-up (14 days)" icon="📮📮" action="follow_up" params={{ days: 14 }} />
        </div>
      </div>

      <div className="section">
        <h2>📱 Content Generation</h2>
        <div className="actions-grid">
          <CommandButton label="Generate Facebook Post" icon="📱" action="generate_carousel" />
          <CommandButton label="Generate SEO Content" icon="✍️" action="generate_content" />
          <CommandButton label="Generate Cold Call Script" icon="📞" action="generate_coldcall" />
        </div>
      </div>

      <style jsx>{`
        .actions-page { max-width: 900px; }
        h1 { margin-bottom: 10px; color: #333; }
        .subtitle { color: #999; margin-bottom: 30px; }
        .section {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }
        .section h2 { margin: 0 0 20px 0; font-size: 18px; color: #555; }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
