'use client';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';



const DAY_THEMES: Record<number, { label: string; desc: string; color: string }> = {
  0: { label: 'Sunday', desc: 'Educational — teach local SEO concepts', color: '#6c47ff' },
  1: { label: 'Monday', desc: 'Motivational + quick win tips', color: '#10b981' },
  2: { label: 'Tuesday', desc: 'Tool spotlight + strategy', color: '#3b82f6' },
  3: { label: 'Wednesday', desc: 'Client win stories + social proof', color: '#f59e0b' },
  4: { label: 'Thursday', desc: 'How-to guides + step-by-step', color: '#8b5cf6' },
  5: { label: 'Friday', desc: 'Industry news + trends', color: '#ef4444' },
  6: { label: 'Saturday', desc: 'Behind the scenes + team culture', color: '#10b981' },
};

export default function Facebook() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/ec2/stats`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const today = new Date().getDay();
  const theme = DAY_THEMES[today];

  return (
    <Layout active="/facebook">
      <div className="page-header">
        <h1>Facebook Textpilot</h1>
        <span className={`status-pill ${data?.services?.fb_autopilot ? 'green' : 'red'}`}>
          {data?.services?.fb_autopilot ? '● Running' : '● Down'}
        </span>
      </div>

      <div className="cards-row">
        <div className="stat-block">
          <div className="stat-number">{data?.facebook?.posts_today ?? '—'}</div>
          <div className="stat-label">Posts Today</div>
        </div>
        <div className="stat-block purple">
          <div className="stat-number">1–3</div>
          <div className="stat-label">Daily Schedule</div>
        </div>
        <div className="stat-block blue">
          <div className="stat-number">Text</div>
          <div className="stat-label">Pexels Photos</div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Today's Content Theme</div>
        <div className="theme-card" style={{ borderColor: theme.color }}>
          <div className="theme-day" style={{ color: theme.color }}>{theme.label}</div>
          <div className="theme-desc">{theme.desc}</div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">Weekly Schedule</div>
        <div className="week-grid">
          {Object.entries(DAY_THEMES).map(([day, t]) => (
            <div key={day} className={`day-card ${parseInt(day) === today ? 'today' : ''}`}>
              <div className="day-label">{t.label.slice(0, 3)}</div>
              <div className="day-dot" style={{ background: t.color }} />
              <div className="day-theme">{t.desc.split('—')[0].trim()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-title">Configuration</div>
        <div className="config-list">
          <div className="config-row">
            <span className="config-key">Page</span>
            <span className="config-val">TD Local SEO</span>
          </div>
          <div className="config-row">
            <span className="config-key">Page ID</span>
            <span className="config-val mono">1145006932019443</span>
          </div>
          <div className="config-row">
            <span className="config-key">Post Type</span>
            <span className="config-val">Text only</span>
          </div>
          <div className="config-row">
            <span className="config-key">Frequency</span>
            <span className="config-val">1–3 posts/day (randomized)</span>
          </div>
          <div className="config-row">
            <span className="config-key">CTA</span>
            <span className="config-val">DM us / Comment below</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        h1 { font-size: 28px; font-weight: 700; color: #fff; margin: 0; }
        .status-pill {
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-pill.green { background: #064e3b; color: #10b981; }
        .status-pill.red { background: #450a0a; color: #ef4444; }
        .cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .stat-block {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
        }
        .stat-block.purple { border-color: #3b1f6f; background: #1a0f35; }
        .stat-block.blue { border-color: #1e3a5f; background: #0f1e35; }
        .stat-number { font-size: 40px; font-weight: 700; color: #fff; line-height: 1; }
        .stat-label { font-size: 12px; color: #6b7280; margin-top: 8px; }
        .section { margin-bottom: 28px; }
        .section-title {
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }
        .theme-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-left-width: 3px;
          border-radius: 12px;
          padding: 20px 24px;
        }
        .theme-day { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
        .theme-desc { font-size: 14px; color: #9ca3af; }
        .week-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        .day-card {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 8px;
          padding: 12px 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .day-card.today { border-color: #6c47ff; background: #1e1040; }
        .day-label { font-size: 11px; font-weight: 600; color: #9ca3af; }
        .day-dot { width: 8px; height: 8px; border-radius: 50%; }
        .day-theme { font-size: 10px; color: #6b7280; line-height: 1.3; }
        .config-list {
          background: #1a1a2e;
          border: 1px solid #2d2d4e;
          border-radius: 12px;
          overflow: hidden;
        }
        .config-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid #12121f;
        }
        .config-row:last-child { border-bottom: none; }
        .config-key { font-size: 13px; color: #6b7280; }
        .config-val { font-size: 13px; color: #d1d5db; font-weight: 500; }
        .config-val.mono { font-family: monospace; font-size: 12px; }
        @media (max-width: 600px) {
          .cards-row { grid-template-columns: 1fr; }
          .week-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </Layout>
  );
}
