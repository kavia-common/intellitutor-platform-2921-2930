const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const USE_MOCK = String(process.env.REACT_APP_USE_MOCK_API || 'true') === 'true';

// PUBLIC_INTERFACE
export const apiConfig = {
  /** API configuration for backend integration. */
  BASE_URL,
  USE_MOCK,
};

// PUBLIC_INTERFACE
export async function apiGet(path) {
  /** GET helper using fetch, if not in mock mode. */
  const res = await fetch(`${BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body) {
  /** POST helper using fetch, if not in mock mode. */
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}
