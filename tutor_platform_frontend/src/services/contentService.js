import { apiConfig, apiGet } from './apiClient';
import { mockApi } from './mock/mockApi';

// PUBLIC_INTERFACE
export const contentService = {
  /** Educational content operations. */
  async listContent({ query = '', tags = [] } = {}) {
    if (apiConfig.USE_MOCK) return mockApi.listContent({ query, tags });
    const qs = new URLSearchParams({ query, tags: tags.join(',') }).toString();
    return apiGet(`/content?${qs}`);
  },
  async getContent(contentId) {
    if (apiConfig.USE_MOCK) {
      const items = await mockApi.listContent({});
      return items.find((i) => i.id === contentId) || null;
    }
    return apiGet(`/content/${contentId}`);
  },
};
