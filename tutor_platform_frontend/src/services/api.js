//
//
// API service for interacting with chatbot_backend
// Uses environment variable REACT_APP_BACKEND_BASE_URL for base URL
// If not set, defaults to http://localhost:3001 (as configured in package.json proxy or example env).
//

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:3001";

async function http(method, path, body) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    "Content-Type": "application/json",
  };
  const options = {
    method,
    headers,
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    let errText = "";
    try {
      errText = await res.text();
    } catch {}
    throw new Error(`API ${method} ${path} failed: ${res.status} ${res.statusText} ${errText}`);
  }
  const ct = res.headers.get("content-type");
  if (ct && ct.includes("application/json")) {
    return res.json();
  }
  return null;
}

// PUBLIC_INTERFACE
export async function healthCheck() {
  /** Check backend health. */
  return http("GET", "/");
}

// PUBLIC_INTERFACE
export async function createSession(payload) {
  /** Create a new tutoring session.
   * payload: { user_id: string, subject?: string, level?: string, goals?: string[] }
   */
  return http("POST", "/sessions", payload);
}

// PUBLIC_INTERFACE
export async function getSession(session_id) {
  /** Get a session by id. */
  return http("GET", `/sessions/${encodeURIComponent(session_id)}`);
}

// PUBLIC_INTERFACE
export async function updateSession(session_id, context) {
  /** Update session context (merge).
   * context: object to merge
   */
  return http("PATCH", `/sessions/${encodeURIComponent(session_id)}`, { context });
}

// PUBLIC_INTERFACE
export async function sendChat(payload) {
  /** Send a chat message.
   * payload: { session_id: string, content: string, agent?: string, use_rag?: boolean, context_overrides?: object }
   */
  return http("POST", "/chat", payload);
}

// PUBLIC_INTERFACE
export async function retrievalQuery(query, top_k = 4) {
  /** Query retrieval system.
   * returns: RetrievalDocument[]
   */
  return http("POST", "/retrieval/query", { query, top_k });
}

// PUBLIC_INTERFACE
export async function orchestrate(payload) {
  /** Orchestrate multi-agent solution.
   * payload: { session_id: string, task: string, agents?: string[], use_rag?: boolean }
   */
  return http("POST", "/orchestrator", payload);
}
