import React from 'react';
import { useChats } from '../../hooks/useChats';

// PUBLIC_INTERFACE
export default function ChatList() {
  /** Displays user's chat threads and allows selection. */
  const { chats, activeChatId, setActiveChatId, createChat } = useChats();

  return (
    <>
      <div className="list" role="list" aria-label="Conversation list">
        {chats.map((c) => (
          <button
            key={c.id}
            className={`list-item ${c.id === activeChatId ? 'active' : ''}`}
            onClick={() => setActiveChatId(c.id)}
            role="listitem"
            aria-pressed={c.id === activeChatId}
          >
            <div className="col" style={{ alignItems: 'flex-start' }}>
              <strong style={{ fontSize: 14 }}>{c.title}</strong>
              <span style={{ color: 'var(--muted)', fontSize: 12 }}>
                {new Date(c.updatedAt).toLocaleString()}
              </span>
            </div>
            <span className="pill" style={{ marginLeft: 'auto' }}>
              {c.messageCount} msg
            </span>
          </button>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={() => createChat()}>
        + New Chat
      </button>
    </>
  );
}
