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

        html, body {
          width: 100%;
          height: 100%;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: #f5f5f5;
          font-size: 16px;
        }

        .app {
          display: flex;
          flex-direction: column;
          width: 100vw;
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
          z-index: 100;
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
          font-size: 16px;
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
          width: calc(100% - 250px);
        }

        /* Desktop */
        @media (max-width: 1024px) {
          .sidebar {
            width: 200px;
            padding: 15px;
          }
          .logo {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .main {
            margin-left: 200px;
            width: calc(100% - 200px);
            padding: 20px;
          }
        }

        /* Tablet */
        @media (max-width: 768px) {
          .app {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            padding: 12px 8px;
            margin-bottom: 0;
          }
          .logo {
            display: none;
          }
          .sidebar ul {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }
          .sidebar li {
            margin: 0;
            flex-shrink: 0;
          }
          .sidebar a {
            padding: 8px 12px;
            font-size: 13px;
            white-space: nowrap;
          }
          .main {
            margin-left: 0;
            width: 100%;
            padding: 12px;
            min-height: calc(100vh - 50px);
          }
        }

        /* Telegram Web App - Aggressive Mobile Optimization */
        .telegram-app {
          --tg-theme-bg-color: #ffffff;
          --tg-theme-text-color: #000000;
          --tg-theme-secondary-bg-color: #f5f5f5;
        }

        .telegram-app {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        .telegram-app body {
          background: var(--tg-theme-bg-color);
          color: var(--tg-theme-text-color);
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .telegram-app .app {
          flex-direction: column;
          width: 100%;
          max-width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .telegram-app .sidebar {
          width: 100%;
          height: auto;
          position: relative;
          padding: 10px 8px;
          margin-left: 0;
          margin-bottom: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-bottom: 2px solid #5568d3;
        }

        .telegram-app .logo {
          display: none;
        }

        .telegram-app .sidebar ul {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .telegram-app .sidebar li {
          margin: 0;
          flex-shrink: 0;
          min-width: fit-content;
        }

        .telegram-app .sidebar a {
          padding: 6px 10px;
          font-size: 12px;
          white-space: nowrap;
          border-radius: 4px;
          color: white;
          text-decoration: none;
          transition: all 0.2s;
        }

        .telegram-app .sidebar a:hover,
        .telegram-app .sidebar a.active {
          background: rgba(255, 255, 255, 0.25);
          font-weight: 600;
        }

        .telegram-app .main {
          margin-left: 0;
          margin-top: 0;
          width: 100%;
          padding: 10px;
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          font-size: 14px;
        }

        /* Ensure content doesn't overflow */
        .telegram-app h1 {
          font-size: 20px;
          margin: 10px 0 5px 0;
        }

        .telegram-app h2 {
          font-size: 16px;
          margin: 8px 0 4px 0;
        }

        .telegram-app p {
          font-size: 13px;
          line-height: 1.4;
          margin: 4px 0;
        }

        /* Hide desktop-only elements */
        @media (max-width: 500px) {
          .telegram-app .sidebar a span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
