import { apiConfig, apiGet } from './apiClient';
import { mockApi } from './mock/mockApi';

// PUBLIC_INTERFACE
export const agentsService = {
  /** Fetch the list of tutor agents. */
  async listAgents() {
    if (apiConfig.USE_MOCK) return mockApi.listAgents();
    return apiGet('/agents');
  },
  async getAgent(agentId) {
    if (apiConfig.USE_MOCK) {
      const list = await mockApi.listAgents();
      return list.find((a) => a.id === agentId) || null;
    }
    return apiGet(`/agents/${agentId}`);
  },
};
