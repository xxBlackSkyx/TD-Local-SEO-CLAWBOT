import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV = [
  { href: '/', label: 'Overview', icon: '⚡' },
  { href: '/leads', label: 'Leads', icon: '🧲' },
  { href: '/audits', label: 'Audits', icon: '🔍' },
  { href: '/facebook', label: 'Facebook', icon: '📱' },
  { href: '/logs', label: 'Logs', icon: '🖥️' },
  { href: '/actions', label: 'Actions', icon: '🚀' },
];

export default function Layout({ children, active }: { children: React.ReactNode; active: string }) {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-mark">TD</span>
          <div className="logo-text">
            <span className="logo-main">Local SEO</span>
            <span className="logo-sub">Command Center</span>
          </div>
        </div>
        <nav>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} className={`nav-item ${currentPath === n.href ? 'active' : ''}`}>
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="footer-dot" />
          <span>16.59.210.149</span>
        </div>
      </aside>
      <main className="main">
        {children}
      </main>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          background: #0a0a14;
          color: #d1d5db;
          -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
      `}</style>
      <style jsx>{`
        .shell {
          display: flex;
          min-height: 100vh;
        }
        .sidebar {
          width: 220px;
          min-width: 220px;
          background: #0f0f1a;
          border-right: 1px solid #1e1e35;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
          padding: 0 4px;
        }
        .logo-mark {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6c47ff, #a855f7);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .logo-main {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .logo-sub {
          font-size: 10px;
          color: #6b7280;
          line-height: 1.2;
        }
        nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #6b7280;
          transition: all 0.15s;
          cursor: pointer;
        }
        .nav-item:hover {
          background: #1a1a2e;
          color: #d1d5db;
        }
        .nav-item.active {
          background: #1e1040;
          color: #fff;
          font-weight: 600;
        }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; }
        .sidebar-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 4px 0;
          border-top: 1px solid #1e1e35;
          font-size: 11px;
          color: #4b5563;
          font-family: monospace;
        }
        .footer-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .main {
          margin-left: 220px;
          flex: 1;
          padding: 40px;
          max-width: calc(100vw - 220px);
          overflow-x: hidden;
        }
        @media (max-width: 768px) {
          .sidebar { width: 100%; min-width: 0; height: auto; position: relative; flex-direction: row; padding: 12px; }
          .logo { margin-bottom: 0; }
          nav { flex-direction: row; flex: unset; }
          .nav-item { padding: 8px; }
          .nav-label { display: none; }
          .sidebar-footer { display: none; }
          .main { margin-left: 0; padding: 16px; max-width: 100%; }
          .shell { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
