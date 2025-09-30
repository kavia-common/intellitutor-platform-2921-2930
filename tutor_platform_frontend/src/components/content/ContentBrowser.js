import React, { useState } from 'react';
import Button from '../common/Button';
import { useContent } from '../../hooks/useContent';
import ContentCard from './ContentCard';

// PUBLIC_INTERFACE
export default function ContentBrowser() {
  /** Searchable grid of educational content, via contentService. */
  const [query, setQuery] = useState('');
  const { items, reload } = useContent();

  const search = (e) => {
    e.preventDefault();
    reload({ query });
  };

  return (
    <div>
      <div className="main-panel-header">
        <form onSubmit={search} className="search" role="search">
          <span>🔎</span>
          <input
            className="input"
            style={{ border: 'none' }}
            placeholder="Search topics, lessons, exercises..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search content"
          />
        </form>
        <div className="row">
          <span className="pill">Recommended</span>
          <span className="pill">Math</span>
          <span className="pill">Science</span>
        </div>
      </div>
      <div className="content-grid">
        {items.map((c) => (
          <ContentCard
            key={c.id}
            title={c.title}
            summary={c.summary}
            tags={c.tags}
            onOpen={() => alert(`Open content: ${c.title}`)}
          />
        ))}
      </div>
      <div style={{ padding: 16 }}>
        <Button kind="ghost" onClick={() => reload({})}>Refresh</Button>
      </div>
    </div>
  );
}
