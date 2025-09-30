import React from 'react';
import { useAgents } from '../../hooks/useAgents';

// PUBLIC_INTERFACE
export default function AgentSelector() {
  /** List of available agents with selection state. */
  const { agents, activeAgentId, setActiveAgentId, loading } = useAgents();

  if (loading) {
    return <div className="list"><div className="list-item">Loading agents...</div></div>;
  }

  return (
    <div className="list" role="list" aria-label="Agent list">
      {agents.map((a) => (
        <button
          key={a.id}
          className={`list-item ${a.id === activeAgentId ? 'active' : ''}`}
          onClick={() => setActiveAgentId(a.id)}
          role="listitem"
          aria-pressed={a.id === activeAgentId}
        >
          <div className="brand-badge" style={{ width: 28, height: 28 }} />
          <div className="col" style={{ alignItems: 'flex-start' }}>
            <strong style={{ fontSize: 14 }}>{a.name}</strong>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>{a.expertise}</span>
          </div>
          <span className="pill" style={{ marginLeft: 'auto' }}>{a.model}</span>
        </button>
      ))}
    </div>
  );
}
