import React, { useEffect, useMemo, useRef, useState } from "react";
import { sendChat, retrievalQuery } from "../services/api";

const MessageBubble = ({ msg }) => {
  const isUser = msg.sender === "user";
  return (
    <div className={`msg-row ${isUser ? "right" : "left"}`}>
      <div className={`msg ${isUser ? "user" : "assistant"}`} role="article" aria-label={`${isUser ? 'User' : 'Assistant'} message`}>
        {!isUser && <div className="agent-tag">{msg.sender}</div>}
        <div className="content">{msg.content}</div>
        {msg.sources && msg.sources.length > 0 && (
          <div className="sources">
            <div className="sources-title">Sources</div>
            <ul>
              {msg.sources.map((s, idx) => (
                <li key={idx}>
                  {s.title || s.id || "Document"} {s.score ? `• ${s.score.toFixed(2)}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const RetrievalPanel = ({ docs, loading, onQuery }) => {
  const [q, setQ] = useState("");
  return (
    <div className="retrieval-panel" aria-label="Knowledge base panel">
      <div className="panel-header">
        <span className="panel-title">Knowledge Base</span>
        <span className="panel-sub">RAG results</span>
      </div>
      <div className="query-row">
        <input
          className="query-input"
          placeholder="Search topics or ask a factual question..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onQuery(q);
          }}
          aria-label="Knowledge base search input"
        />
        <button className="btn" onClick={() => onQuery(q)} disabled={loading || !q.trim()} aria-busy={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="docs">
        {docs.length === 0 && <div className="empty">No documents yet. Try a search.</div>}
        {docs.map((d) => (
          <div key={d.id} className="doc">
            <div className="doc-title">
              {d.metadata?.title || d.id} {d.score != null && <span className="pill">{d.score.toFixed(2)}</span>}
            </div>
            <div className="doc-text">{d.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// PUBLIC_INTERFACE
export default function ChatPanel({
  sessionId,
  activeAgent,
  onSendMessage,
  initialMessages = [],
}) {
  /** Chat panel for sending/receiving messages and viewing retrieval results. */
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [rag, setRag] = useState(true);
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const placeholderNote = useMemo(() => {
    if (!sessionId) {
      return "No session yet. Click New to start a tutoring session.";
    }
    return "";
  }, [sessionId]);

  async function handleSend() {
    const content = input.trim();
    if (!content || !sessionId) return;
    const userMsg = {
      id: `u-${Date.now()}`,
      session_id: sessionId,
      sender: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const payload = {
        session_id: sessionId,
        content,
        agent: activeAgent?.name || null,
        use_rag: rag,
      };
      const res = await sendChat(payload);
      const assistantMsg = {
        ...(res?.message || {}),
        sources: res?.sources || [],
      };
      // Fallback if backend returns nothing
      const safeAssistant = assistantMsg.id
        ? assistantMsg
        : {
            id: `a-${Date.now()}`,
            session_id: sessionId,
            sender: activeAgent?.name || "assistant",
            content: "Thanks for your question. I’m currently offline — please try again shortly.",
            timestamp: new Date().toISOString(),
            sources: [],
          };
      setMessages((prev) => [...prev, safeAssistant]);
      onSendMessage?.(safeAssistant);
    } catch (e) {
      const errMsg = {
        id: `e-${Date.now()}`,
        session_id: sessionId,
        sender: activeAgent?.name || "assistant",
        content: `There was an error contacting the tutor. ${e.message}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  async function handleRetrieval(q) {
    const query = q.trim();
    if (!query) return;
    setRetrievalLoading(true);
    try {
      const res = await retrievalQuery(query, 4);
      setDocs(res || []);
    } catch (e) {
      setDocs([{ id: "error", text: `Retrieval error: ${e.message}`, score: 0 }]);
    } finally {
      setRetrievalLoading(false);
    }
  }

  return (
    <div className="it-chat" aria-live="polite">
      <div className="chat-header">
        <div className="chat-title">
          <span className="gradient">Tutor Chat</span>
          {activeAgent && <span className="agent-pill">{activeAgent.emoji} {activeAgent.name}</span>}
        </div>
        <div className="chat-controls">
          <label className="toggle" aria-label="Toggle use of retrieval augmented generation">
            <input type="checkbox" checked={rag} onChange={(e) => setRag(e.target.checked)} />
            <span className="toggle-label">Use RAG</span>
          </label>
        </div>
      </div>

      <div className="chat-body">
        <div className="messages" ref={listRef} role="log" aria-live="polite">
          {placeholderNote && <div className="placeholder">{placeholderNote}</div>}
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
          {loading && <div className="loading">Thinking...</div>}
        </div>
        <div className="right-rail">
          <RetrievalPanel docs={docs} loading={retrievalLoading} onQuery={handleRetrieval} />
        </div>
      </div>

      <div className="composer">
        <input
          className="composer-input"
          placeholder="Ask a question or request an explanation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={!sessionId}
          aria-label="Message input"
        />
        <button className="btn" onClick={handleSend} disabled={loading || !sessionId || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
