import { useCallback, useEffect, useMemo, useState } from 'react';
import { chatService } from '../services/chatService';
import { useAgents } from './useAgents';

// PUBLIC_INTERFACE
export function useChats() {
  /** Manage list of chats, active chat, and message sending. */
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [sending, setSending] = useState(false);
  const { activeAgentId } = useAgents(); // consume only id to avoid re-renders

  useEffect(() => {
    let mounted = true;
    chatService.listChats().then((res) => {
      if (!mounted) return;
      setChats(res);
      setActiveChatId(res[0]?.id || null);
    });
    return () => { mounted = false; };
  }, []);

  const activeChat = useMemo(
    () => chats.find((c) => c.id === activeChatId) || null,
    [chats, activeChatId]
  );

  const createChat = useCallback(async () => {
    const created = await chatService.createChat({ title: 'New Chat', agentId: activeAgentId });
    setChats((prev) => [created, ...prev]);
    setActiveChatId(created.id);
    return created;
  }, [activeAgentId]);

  const sendMessage = useCallback(async (text) => {
    if (!activeChatId) {
      const created = await createChat();
      await sendMessage(text); // recursion now with chatId
      return;
    }
    setSending(true);
    try {
      const updated = await chatService.sendMessage({ chatId: activeChatId, message: text, agentId: activeAgentId });
      setChats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } finally {
      setSending(false);
    }
  }, [activeChatId, activeAgentId, createChat]);

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    createChat,
    sendMessage,
    sending,
  };
}
