import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [activeSection, setActiveSection] = useState('analytics');

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">🤖 OpenClaw</div>
        <ul>
          <li><Link href="/" className={activeSection === 'analytics' ? 'active' : ''}>📊 Analytics</Link></li>
          <li><Link href="/leads" className={activeSection === 'leads' ? 'active' : ''}>📧 Leads</Link></li>
          <li><Link href="/posting" className={activeSection === 'posting' ? 'active' : ''}>📱 Posting</Link></li>
          <li><Link href="/replies" className={activeSection === 'replies' ? 'active' : ''}>💬 Replies</Link></li>
          <li><Link href="/actions" className={activeSection === 'actions' ? 'active' : ''}>🚀 Quick Actions</Link></li>
        </ul>
      </nav>
      
      <div className="main">
        <Component {...pageProps} />
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: #f5f5f5;
        }
        .app {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 250px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 30px;
          text-align: center;
        }
        .sidebar ul {
          list-style: none;
        }
        .sidebar li {
          margin: 10px 0;
        }
        .sidebar a {
          color: white;
          text-decoration: none;
          display: block;
          padding: 12px 15px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .sidebar a:hover, .sidebar a.active {
          background: rgba(255,255,255,0.2);
          font-weight: bold;
        }
        .main {
          margin-left: 250px;
          flex: 1;
          padding: 30px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .sidebar { width: 100%; height: auto; position: relative; }
          .main { margin-left: 0; }
          .sidebar ul { display: flex; gap: 10px; overflow-x: auto; }
        }
      `}</style>
    </div>
  );
}
