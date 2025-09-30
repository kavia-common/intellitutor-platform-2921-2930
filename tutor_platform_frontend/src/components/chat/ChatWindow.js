import React from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

// PUBLIC_INTERFACE
export default function ChatWindow({ messages, onSend, sending }) {
  /** Chat window consisting of message list and input. */
  return (
    <div className="chat-window">
      <div className="messages" role="log" aria-live="polite">
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}
      </div>
      <ChatInput onSend={onSend} disabled={sending} />
    </div>
  );
}
