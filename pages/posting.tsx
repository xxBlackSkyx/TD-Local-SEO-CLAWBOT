export default function Posting() {
  return (
    <div className="posting-page">
      <h1>📱 Posting Section</h1>
      <div className="section">
        <h2>Generate & Schedule Posts</h2>
        <p>Content generation features coming soon...</p>
      </div>
      <style jsx>{`
        .posting-page { max-width: 900px; }
        .section {
          background: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
