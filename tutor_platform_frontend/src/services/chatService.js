import { apiConfig, apiGet, apiPost } from './apiClient';
import { mockApi } from './mock/mockApi';

// PUBLIC_INTERFACE
export const chatService = {
  /** Chat related operations. */
  async listChats() {
    if (apiConfig.USE_MOCK) return mockApi.listChats();
    return apiGet('/chats');
  },
  async createChat({ title, agentId }) {
    if (apiConfig.USE_MOCK) return mockApi.createChat({ title, agentId });
    return apiPost('/chats', { title, agentId });
  },
  async getChat(chatId) {
    if (apiConfig.USE_MOCK) return mockApi.getChat({ chatId });
    return apiGet(`/chats/${chatId}`);
  },
  async sendMessage({ chatId, message, agentId }) {
    if (apiConfig.USE_MOCK) return mockApi.sendMessage({ chatId, message, agentId });
    return apiPost(`/chats/${chatId}/messages`, { message, agentId });
  },
};
