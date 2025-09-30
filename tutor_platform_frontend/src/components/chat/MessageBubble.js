import React from 'react';

// PUBLIC_INTERFACE
export default function MessageBubble({ role, content }) {
  /** Single chat message bubble. role: 'user' | 'agent' */
  const isUser = role === 'user';
  return (
    <div className={`message ${isUser ? 'user' : 'agent'}`}>
      {!isUser && <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4, color: 'var(--primary)' }}>Tutor</div>}
      <div>{content}</div>
    </div>
  );
}
