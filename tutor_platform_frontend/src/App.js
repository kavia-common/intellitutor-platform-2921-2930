import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import { createSession, getSession, healthCheck } from './services/api';

// PUBLIC_INTERFACE
function App() {
  /** Root application component: layout (header, sidebar, main panel) and session state. */

  const [theme, setTheme] = useState('light');
  const [backendHealthy, setBackendHealthy] = useState(true);

  // Demo user in absence of auth
  const user = useMemo(() => ({ id: 'demo-user', name: 'You', initials: 'YU' }), []);

  // Agents placeholder
  const [agents] = useState([
    { name: 'General Tutor', emoji: '🧠', short: 'Explanations & Q&A', description: 'General-purpose tutor providing helpful, step-by-step explanations.' },
    { name: 'Math Coach', emoji: '➗', short: 'Math problems', description: 'Solves math problems with detailed steps and hints.' },
    { name: 'Science Guru', emoji: '🔬', short: 'STEM topics', description: 'Explains Physics, Chemistry, Biology concepts clearly.' },
    { name: 'Writing Mentor', emoji: '✍️', short: 'Essays & structure', description: 'Guides in writing, editing, and improving structure.' },
  ]);
  const [activeAgent, setActiveAgent] = useState(agents[0]);

  // Recent chats placeholder
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Current session
  const [sessionId, setSessionId] = useState(null);

  // Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Check backend health; if unhealthy, keep UI but show degraded mode.
    (async () => {
      try {
        await healthCheck();
        setBackendHealthy(true);
      } catch {
        setBackendHealthy(false);
      }
    })();
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  async function startNewChat() {
    // Create a new session (placeholder user)
    try {
      const res = await createSession({ user_id: user.id, subject: null, level: null, goals: [] });
      const sId = res?.id;
      setSessionId(sId);
      const chat = {
        id: sId,
        title: `Session ${String(chats.length + 1).padStart(2, '0')}`,
        subtitle: new Date().toLocaleString(),
      };
      setChats(prev => [chat, ...prev]);
      setActiveChatId(chat.id);
    } catch (e) {
      console.error('Failed to create session', e);
      // Fallback: local-only chat id
      const localId = `local-${Date.now()}`;
      setSessionId(null);
      const chat = {
        id: localId,
        title: `Local Chat ${String(chats.length + 1).padStart(2, '0')}`,
        subtitle: 'Offline mode',
      };
      setChats(prev => [chat, ...prev]);
      setActiveChatId(chat.id);
    }
  }

  async function openChat(chat) {
    setActiveChatId(chat.id);
    // Attempt loading session if it looks like a real session
    if (!chat.id.startsWith('local-')) {
      try {
        const s = await getSession(chat.id);
        setSessionId(s?.id || chat.id);
      } catch {
        setSessionId(null);
      }
    } else {
      setSessionId(null);
    }
  }

  return (
    <div className="it-app">
      <Header theme={theme} onToggleTheme={toggleTheme} user={user} />
      {!backendHealthy && (
        <div className="banner-warning">
          Backend is unreachable. You can explore the UI in offline mode; chat features may be limited.
        </div>
      )}
      <div className="it-main">
        <Sidebar
          agents={agents}
          activeAgent={activeAgent}
          onSelectAgent={setActiveAgent}
          chats={chats}
          activeChatId={activeChatId}
          onOpenChat={openChat}
          onNewChat={startNewChat}
        />
        <main className="it-content">
          <ChatPanel
            sessionId={sessionId}
            activeAgent={activeAgent}
            onSendMessage={() => {}}
            initialMessages={[
              {
                id: 'welcome-1',
                session_id: 'welcome',
                sender: activeAgent?.name || 'assistant',
                content:
                  'Welcome to IntelliTutor! Ask me anything or start a new session to begin personalized tutoring.',
                timestamp: new Date().toISOString(),
              },
            ]}
          />
        </main>
      </div>
      <footer className="it-footer">
        <span>© {new Date().getFullYear()} IntelliTutor</span>
      </footer>
    </div>
  );
}

export default App;
