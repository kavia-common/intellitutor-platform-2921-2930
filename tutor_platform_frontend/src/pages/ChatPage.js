import React from 'react';
import ChatWindow from '../components/chat/ChatWindow';
import { useChats } from '../hooks/useChats';
import { useAgents } from '../hooks/useAgents';

// PUBLIC_INTERFACE
export default function ChatPage() {
  /** Chat page showing chat header and window for active conversation. */
  const { activeChat, sendMessage, sending } = useChats();
  const { activeAgent } = useAgents();

  return (
    <>
      <div className="main-panel-header">
        <div className="row">
          <div className="brand-badge" />
          <div className="col" style={{ alignItems: 'flex-start' }}>
            <strong>{activeChat?.title || 'New Chat'}</strong>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>
              {activeAgent ? `${activeAgent.name} • ${activeAgent.model}` : 'Select an agent'}
            </span>
          </div>
        </div>
        <div className="row">
          <span className="pill">Live</span>
          <span className="pill">RAG</span>
        </div>
      </div>
      <ChatWindow messages={activeChat?.messages || []} onSend={sendMessage} sending={sending} />
    </>
  );
}
