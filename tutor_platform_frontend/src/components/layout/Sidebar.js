import React from 'react';
import AgentSelector from '../chat/AgentSelector';
import ChatList from '../chat/ChatList';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar containing agent selector and conversation list. */
  return (
    <aside className="sidebar">
      <div className="section-title">Agents</div>
      <AgentSelector />
      <div className="section-title" style={{ marginTop: 12 }}>Conversations</div>
      <ChatList />
    </aside>
  );
}
