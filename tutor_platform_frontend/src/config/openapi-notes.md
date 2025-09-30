The frontend integrates with chatbot_backend via REST. Expected endpoints (to be confirmed with backend openapi.json):

Agents
- GET /agents
- GET /agents/{agentId}

Chats
- GET /chats                       -> list
- POST /chats                      -> create {title, agentId}
- GET /chats/{chatId}              -> get details incl. messages
- POST /chats/{chatId}/messages    -> send message {message, agentId}

Content
- GET /content?query=&tags=a,b     -> list with filters
- GET /content/{contentId}         -> get content details

Set REACT_APP_API_BASE_URL accordingly. Enable mock mode via REACT_APP_USE_MOCK_API=true for local development.
