'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MetricsCard from '@/components/MetricsCard';
import CommandButton from '@/components/CommandButton';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('/api/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading metrics...</div>;

  return (
    <div className="dashboard">
      <h1>📊 Analytics Dashboard</h1>
      
      <div className="metrics-grid">
        <MetricsCard title="Emails Sent" value={metrics?.sent || 0} icon="📧" color="#4CAF50" />
        <MetricsCard title="Opened" value={metrics?.opened || 0} icon="👀" color="#2196F3" />
        <MetricsCard title="Replied" value={metrics?.replied || 0} icon="💬" color="#FF9800" />
        <MetricsCard title="Open Rate" value={`${metrics?.openRate || 0}%`} icon="📈" color="#9C27B0" />
      </div>

      <div className="section">
        <h2>🚀 Quick Actions</h2>
        <div className="actions-grid">
          <CommandButton 
            label="Send 15 Emails NOW"
            icon="📧"
            action="send_emails"
            params={{ count: 15 }}
          />
          <CommandButton 
            label="Follow-up Campaign"
            icon="📮"
            action="follow_up"
            params={{ days: 7 }}
          />
          <CommandButton 
            label="Generate Facebook Post"
            icon="📱"
            action="generate_carousel"
          />
          <CommandButton 
            label="Generate SEO Content"
            icon="✍️"
            action="generate_content"
          />
        </div>
      </div>

      <div className="section">
        <h2>📊 Template Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Template</th>
              <th>Sent</th>
              <th>Opened</th>
              <th>Open Rate</th>
              <th>Replied</th>
              <th>Reply Rate</th>
            </tr>
          </thead>
          <tbody>
            {metrics?.templates?.map((t: any) => (
              <tr key={t.template_used}>
                <td>{t.template_used}</td>
                <td>{t.sent}</td>
                <td>{t.opened}</td>
                <td>{((t.opened / t.sent) * 100).toFixed(1)}%</td>
                <td>{t.replied}</td>
                <td>{((t.replied / t.sent) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .dashboard { max-width: 1200px; }
        h1 { margin-bottom: 30px; color: #333; }
        h2 { margin: 30px 0 20px 0; color: #555; font-size: 20px; }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        table th {
          background: #f5f5f5;
          padding: 12px;
          text-align: left;
          font-weight: bold;
          border-bottom: 2px solid #ddd;
        }
        table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }
        table tr:hover {
          background: #f9f9f9;
        }
        .loading { padding: 40px; text-align: center; font-size: 18px; color: #666; }
      `}</style>
    </div>
  );
}
