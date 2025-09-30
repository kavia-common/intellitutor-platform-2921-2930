 // PUBLIC_INTERFACE
export const storage = {
  /** Simple namespaced localStorage helper. */
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  },
  remove(key) {
    try { localStorage.removeItem(key); } catch { /* noop */ }
  },
};
