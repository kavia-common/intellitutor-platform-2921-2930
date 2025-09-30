import React from "react";

const AgentItem = ({ agent, active, onSelect }) => {
  return (
    <button
      className={`agent-item ${active ? "active" : ""}`}
      onClick={() => onSelect(agent)}
      title={agent.description}
    >
      <span className="emoji">{agent.emoji}</span>
      <div className="meta">
        <span className="name">{agent.name}</span>
        <span className="desc">{agent.short}</span>
      </div>
    </button>
  );
};

const ChatListItem = ({ chat, active, onOpen }) => {
  return (
    <button className={`chat-item ${active ? "active" : ""}`} onClick={() => onOpen(chat)}>
      <div className="chat-title">{chat.title}</div>
      <div className="chat-sub">{chat.subtitle}</div>
    </button>
  );
};

// PUBLIC_INTERFACE
export default function Sidebar({
  agents = [],
  activeAgent,
  onSelectAgent,
  chats = [],
  activeChatId,
  onOpenChat,
  onNewChat,
}) {
  /** Sidebar showing selectable agents and recent chats. */
  return (
    <aside className="it-sidebar">
      <div className="sidebar-section">
        <div className="section-header">
          <span className="section-title">Agents</span>
        </div>
        <div className="agents">
          {agents.map((a) => (
            <AgentItem
              key={a.name}
              agent={a}
              active={activeAgent?.name === a.name}
              onSelect={onSelectAgent}
            />
          ))}
        </div>
      </div>
      <div className="sidebar-section">
        <div className="section-header with-action">
          <span className="section-title">Recent Chats</span>
          <button className="btn-amber" onClick={onNewChat}>+ New</button>
        </div>
        <div className="chat-list">
          {chats.length === 0 && (
            <div className="empty">No recent chats. Start a new conversation.</div>
          )}
          {chats.map((c) => (
            <ChatListItem
              key={c.id}
              chat={c}
              active={c.id === activeChatId}
              onOpen={onOpenChat}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
