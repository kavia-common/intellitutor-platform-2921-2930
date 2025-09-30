import React, { useState } from 'react';
import Button from '../common/Button';

// PUBLIC_INTERFACE
export default function ChatInput({ onSend, disabled }) {
  /** Text input and send button for chat. */
  const [text, setText] = useState('');

  const submit = () => {
    const val = text.trim();
    if (!val) return;
    onSend?.(val);
    setText('');
  };

  return (
    <div className="chat-input">
      <input
        className="input"
        placeholder="Ask a question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey ? (e.preventDefault(), submit()) : null}
        aria-label="Chat input"
        disabled={disabled}
      />
      <Button kind="primary" onClick={submit} disabled={disabled} aria-label="Send message">
        ➤ Send
      </Button>
    </div>
  );
}
