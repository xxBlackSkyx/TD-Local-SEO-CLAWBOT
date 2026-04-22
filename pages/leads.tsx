'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get('/api/leads');
        setLeads(response.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const filtered = leads.filter(lead => 
    lead.name?.toLowerCase().includes(search.toLowerCase()) ||
    lead.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="leads-page">
      <h1>📧 Leads Management</h1>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="count">Total: {filtered.length} leads</span>
      </div>

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Industry</th>
              <th>Location</th>
              <th>Sent</th>
              <th>Opened</th>
              <th>Replied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.industry || '-'}</td>
                <td>{lead.location || '-'}</td>
                <td>{lead.email_sent_count}</td>
                <td>{lead.email_opened ? '✅' : '⏳'}</td>
                <td>{lead.email_replied ? '✅' : '❌'}</td>
                <td>
                  {lead.email_replied ? '🔥 Hot' : lead.email_opened ? '👀 Interested' : '📧 Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .leads-page { max-width: 1200px; }
        h1 { margin-bottom: 25px; color: #333; }
        .filters {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          align-items: center;
        }
        input {
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          flex: 1;
        }
        .count {
          padding: 10px 15px;
          background: #f5f5f5;
          border-radius: 6px;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: bold;
        }
        table td {
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
        }
        table tr:hover {
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
}
