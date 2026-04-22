'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Replies() {
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get('/api/replies');
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReplies();
    const interval = setInterval(fetchReplies, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="replies-page">
      <h1>💬 Reply Inbox</h1>
      <p className="subtitle">New replies from business owners - {replies.length} total</p>

      {loading ? (
        <p>Loading replies...</p>
      ) : replies.length === 0 ? (
        <div className="empty">
          <p>✅ No replies yet. Check back soon!</p>
        </div>
      ) : (
        <div className="replies-list">
          {replies.map((reply) => (
            <div key={reply.id} className="reply-card">
              <div className="header">
                <h3>{reply.lead_name || reply.sender_name}</h3>
                <span className="date">
                  {new Date(reply.received_at).toLocaleDateString()}
                </span>
              </div>
              <p className="from">{reply.sender_email}</p>
              <p className="subject"><strong>{reply.subject}</strong></p>
              <p className="body">{reply.body}</p>
              <div className="actions">
                <button className="respond">💬 Respond</button>
                <button className="mark-spam">🚫 Mark Spam</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .replies-page { max-width: 900px; }
        h1 { margin-bottom: 10px; color: #333; }
        .subtitle { color: #999; margin-bottom: 25px; }
        .empty {
          background: white;
          padding: 40px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .replies-list { display: flex; flex-direction: column; gap: 15px; }
        .reply-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid #FF9800;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .header h3 { margin: 0; color: #333; }
        .date { color: #999; font-size: 12px; }
        .from { color: #666; margin: 5px 0; }
        .subject { margin: 10px 0; font-size: 14px; }
        .body {
          margin: 15px 0;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 6px;
          line-height: 1.5;
        }
        .actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        button {
          padding: 8px 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
        }
        .respond {
          background: #4CAF50;
          color: white;
        }
        .mark-spam {
          background: #f5f5f5;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}
