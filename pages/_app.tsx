import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isInTelegram } from '../lib/telegram-webapp';

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  is_bot: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready(): void;
        expand(): void;
        close(): void;
        initData: string;
        initDataUnsafe: { user?: TelegramUser };
        onEvent: (eventType: string, callback: () => void) => void;
        offEvent: (eventType: string, callback: () => void) => void;
        MainButton: {
          setText(text: string): void;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
        };
      };
    };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [activeSection, setActiveSection] = useState('analytics');
  const [isTelegramApp, setIsTelegramApp] = useState(false);
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // Check if in Telegram after script loads
    const checkTelegram = () => {
      if (isInTelegram()) {
        const webapp = window.Telegram!.WebApp;
        webapp.ready();
        webapp.expand();

        setIsTelegramApp(true);
        const user = webapp.initDataUnsafe?.user;
        if (user) {
          setTelegramUser(user);
        }
      }
    };

    // Check immediately and after script loads
    checkTelegram();

    const interval = setInterval(checkTelegram, 100);
    setTimeout(() => clearInterval(interval), 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`app ${isTelegramApp ? 'telegram-app' : ''}`}>
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

        /* Telegram Web App Optimizations */
        .telegram-app {
          --tg-theme-bg-color: #ffffff;
          --tg-theme-text-color: #000000;
          --tg-theme-hint-color: #999999;
          --tg-theme-link-color: #0077ff;
          --tg-theme-button-color: #667eea;
          --tg-theme-button-text-color: #ffffff;
          --tg-theme-secondary-bg-color: #f5f5f5;
        }

        .telegram-app body {
          background: var(--tg-theme-bg-color);
          color: var(--tg-theme-text-color);
        }

        .telegram-app .sidebar {
          width: 100%;
          height: auto;
          position: relative;
          padding: 10px;
        }

        .telegram-app .main {
          margin-left: 0;
          padding: 15px;
        }

        .telegram-app .sidebar ul {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          list-style: none;
        }

        .telegram-app .sidebar li {
          margin: 0;
          flex-shrink: 0;
        }

        .telegram-app .sidebar a {
          padding: 8px 12px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
