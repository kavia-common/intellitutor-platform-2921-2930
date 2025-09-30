import { useCallback, useEffect, useState } from 'react';
import { contentService } from '../services/contentService';

// PUBLIC_INTERFACE
export function useContent() {
  /** Manage content listing and search. */
  const [items, setItems] = useState([]);

  const reload = useCallback(async ({ query = '', tags = [] } = {}) => {
    const res = await contentService.listContent({ query, tags });
    setItems(res);
  }, []);

  useEffect(() => {
    reload({});
  }, [reload]);

  return { items, reload };
}
