'use client';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://16.59.210.149:8080';

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(`${API}/api/leads`)
      .then(r => r.json())
      .then(d => { setLeads(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = leads.filter(l =>
    !filter ||
    (l.business_name || '').toLowerCase().includes(filter.toLowerCase()) ||
    (l.email || '').toLowerCase().includes(filter.toLowerCase()) ||
    (l.city || '').toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Layout active="/leads">
      <div className="page-header">
        <h1>Leads</h1>
        <input
          className="search"
          placeholder="Search name, email, city..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="table-wrap">
        {loading ? (
          <div className="empty">Connecting to EC2...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">No leads found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Business</th>
                <th>Email</th>
                <th>City</th>
                <th>Niche</th>
                <th>Emails</th>
                <th>Status</th>
                <th>Last Sent</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l: any) => (
                <tr key={l.id}>
                  <td className="name-cell">
                    <span>{l.business_name || '—'}</span>
                    {l.website && (
                      <a href={`https://${l.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="link-icon">↗</a>
                    )}
                  </td>
                  <td className="mono">{l.email || '—'}</td>
                  <td>{l.city || '—'}</td>
                  <td>{l.niche || '—'}</td>
                  <td className="center">{l.email_count || 0}</td>
                  <td>
                    {l.replied
                      ? <span className="badge green">Replied 🔥</span>
                      : l.opened
                      ? <span className="badge blue">Opened</span>
                      : l.emailed
                      ? <span className="badge gray">Sent</span>
                      : <span className="badge dark">Queued</span>}
                  </td>
                  <td className="mono small">{l.last_email_sent_at ? l.last_email_sent_at.split('T')[0] : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="count">{filtered.length} leads shown of {leads.length} total</div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          gap: 16px;
          flex-wrap: wrap;
        }
        h1 { font-size: 28px; font-weight: 700; color: #fff; margin: 0; }
        .search {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 8px;
          padding: 10px 14px;
          color: #fff;
          font-size: 14px;
          width: 280px;
          outline: none;
        }
        .search::placeholder { color: #6b7280; }
        .search:focus { border-color: #6c47ff; }
        .table-wrap {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          overflow-x: auto;
        }
        table { width: 100%; border-collapse: collapse; }
        thead tr { border-bottom: 1px solid #2d2d4e; }
        th {
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        td {
          padding: 12px 16px;
          font-size: 13px;
          color: #d1d5db;
          border-bottom: 1px solid #12121f;
        }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #12122a; }
        .name-cell { display: flex; align-items: center; gap: 6px; color: #fff; font-weight: 500; }
        .link-icon { color: #6c47ff; font-size: 11px; text-decoration: none; }
        .mono { font-family: monospace; font-size: 12px; }
        .small { font-size: 12px; }
        .center { text-align: center; }
        .badge {
          padding: 3px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
        }
        .badge.green { background: #064e3b; color: #10b981; }
        .badge.blue { background: #1e3a5f; color: #60a5fa; }
        .badge.gray { background: #374151; color: #9ca3af; }
        .badge.dark { background: #1f1f35; color: #6b7280; }
        .empty { padding: 60px; text-align: center; color: #6b7280; }
        .count { margin-top: 12px; font-size: 12px; color: #6b7280; text-align: right; }
      `}</style>
    </Layout>
  );
}
