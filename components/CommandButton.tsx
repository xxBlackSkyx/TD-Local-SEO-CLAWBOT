'use client';
import React, { useState } from 'react';
import axios from 'axios';

interface CommandButtonProps {
  label: string;
  icon: string;
  action: string;
  params?: Record<string, any>;
  onSuccess?: (data: any) => void;
}

export default function CommandButton({ label, icon, action, params = {}, onSuccess }: CommandButtonProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setMessage('Processing...');
    try {
      const response = await axios.post('/api/actions', {
        action,
        params
      });
      setMessage('✅ ' + (response.data.success ? 'Completed!' : 'Error'));
      onSuccess?.(response.data);
    } catch (error: any) {
      setMessage('❌ ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="command-button">
      <button onClick={handleClick} disabled={loading} className={loading ? 'loading' : ''}>
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
      </button>
      {message && <p className="message">{message}</p>}
      <style jsx>{`
        .command-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        button {
          padding: 12px 24px;
          border: 2px solid #007bff;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        button:hover:not(:disabled) {
          background: #007bff;
          color: white;
          transform: scale(1.05);
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .icon { font-size: 20px; }
        .message {
          font-size: 12px;
          text-align: center;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
