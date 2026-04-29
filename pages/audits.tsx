'use client';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';



export default function Audits() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ec2/audits`)
      .then(r => r.json())
      .then(d => { setAudits(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout active="/audits">
      <div className="page-header">
        <h1>Audits</h1>
        <span className="count-badge">{audits.length} total</span>
      </div>

      {loading ? (
        <div className="empty">Connecting to EC2...</div>
      ) : audits.length === 0 ? (
        <div className="empty">No audits yet. Run /onboard in Telegram to start one.</div>
      ) : (
        <div className="audit-list">
          {audits.map((a: any) => (
            <div key={a.id} className="audit-card">
              <div className="audit-top">
                <div>
                  <div className="audit-name">{a.client_name}</div>
                  <div className="audit-url">{a.website}</div>
                </div>
                <span className={`status-badge ${a.status === 'complete' ? 'green' : 'gray'}`}>
                  {a.status || 'pending'}
                </span>
              </div>
              <div className="audit-date">
                {a.audited_at ? new Date(a.audited_at).toLocaleString() : '—'}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        h1 { font-size: 28px; font-weight: 700; color: #fff; margin: 0; }
        .count-badge {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          color: #9ca3af;
        }
        .empty {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 60px;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .audit-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .audit-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 20px 24px;
        }
        .audit-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        .audit-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2px;
        }
        .audit-url {
          font-size: 12px;
          color: #6c47ff;
          font-family: monospace;
        }
        .status-badge {
          padding: 3px 10px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-badge.green { background: #064e3b; color: #10b981; }
        .status-badge.gray { background: #374151; color: #9ca3af; }
        .audit-date {
          font-size: 12px;
          color: #6b7280;
          font-family: monospace;
        }
      `}</style>
    </Layout>
  );
}
