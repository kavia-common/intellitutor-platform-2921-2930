import { mockAgents, mockChats as mockChatsSeed, mockContent } from './mockData';

let chats = [...mockChatsSeed];
let idCounter = 1000;

function genId(prefix) {
  idCounter += 1;
  return `${prefix}${idCounter}`;
}

// PUBLIC_INTERFACE
export const mockApi = {
  /** Mocked API surface mirroring backend endpoints. */
  async listAgents() {
    await delay(150);
    return mockAgents;
  },
  async listChats() {
    await delay(150);
    return chats.map(withCounts);
  },
  async createChat({ title = 'New Chat', agentId }) {
    await delay(150);
    const newChat = {
      id: genId('c'),
      title,
      updatedAt: new Date().toISOString(),
      messageCount: 0,
      messages: [],
      agentId: agentId || null,
    };
    chats = [newChat, ...chats];
    return newChat;
  },
  async getChat({ chatId }) {
    await delay(120);
    return chats.find((c) => c.id === chatId) || null;
  },
  async sendMessage({ chatId, message, agentId }) {
    await delay(250);
    let chat = chats.find((c) => c.id === chatId);
    if (!chat) {
      chat = {
        id: chatId || genId('c'),
        title: 'New Chat',
        updatedAt: new Date().toISOString(),
        messageCount: 0,
        messages: [],
        agentId: agentId || null,
      };
      chats.unshift(chat);
    }
    chat.messages.push({ id: genId('m'), role: 'user', content: message });
    // simple simulated agent reply
    chat.messages.push({
      id: genId('m'),
      role: 'agent',
      content: `Here's an explanation related to: "${message}". (This is a mock response)`,
    });
    chat.updatedAt = new Date().toISOString();
    chat.messageCount = chat.messages.length;
    return { ...chat };
  },
  async listContent({ query = '', tags = [] } = {}) {
    await delay(150);
    let items = mockContent;
    if (query) {
      const q = query.toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q));
    }
    if (tags?.length) {
      items = items.filter((i) => tags.every((t) => i.tags.includes(t)));
    }
    return items;
  },
};

function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
function withCounts(c) { return { ...c, messageCount: (c.messages?.length) || 0 }; }
