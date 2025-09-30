import React from 'react';

// PUBLIC_INTERFACE
export default function ContentCard({ title, summary, tags = [], onOpen }) {
  /** Small card to preview educational content. */
  return (
    <div className="content-card" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen?.()}>
      <h4 style={{ margin: '6px 0' }}>{title}</h4>
      <p style={{ color: 'var(--muted)', marginTop: 4 }}>{summary}</p>
      <div style={{ marginTop: 8 }}>
        {tags.map((t) => (
          <span className="tag" key={t}>#{t}</span>
        ))}
      </div>
    </div>
  );
}
