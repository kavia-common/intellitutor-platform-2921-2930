# Tutor Platform Frontend (React)

Modern, lightweight React frontend for an educational multi-agent tutor platform.

Features
- Ocean Professional theme (blue & amber accents, rounded corners, subtle gradients)
- Sidebar with agent selection and chat list
- Main panel for real-time chat and educational content browsing
- Header with profile menu and theme toggle (light/dark)
- Modular services layer with mock mode for backend REST calls
- Scalable, readable component structure
- Accessibility-minded components and keyboard navigation

Getting Started
1. Install dependencies
   npm install

2. Create environment config
   - Copy .env.example to .env and set variables

3. Start development server
   npm start

Environment Variables
- REACT_APP_API_BASE_URL: Base URL for chatbot_backend (e.g. http://localhost:8000)
- REACT_APP_USE_MOCK_API: "true" to use mocked API responses (default true)

Project Structure
src/
  index.js, index.css
  App.js, App.css
  theme/
    theme.css               - CSS variables for Ocean Professional
    ThemeProvider.js        - Theme context and toggle
  components/
    layout/
      Header.js
      Sidebar.js
      MainPanel.js
    chat/
      ChatWindow.js
      MessageBubble.js
      ChatInput.js
      AgentSelector.js
      ChatList.js
    content/
      ContentBrowser.js
      ContentCard.js
    common/
      Button.js
      Avatar.js
      Spinner.js
      Toggle.js
      EmptyState.js
  pages/
    ChatPage.js
    ContentPage.js
  services/
    apiClient.js
    chatService.js
    agentsService.js
    contentService.js
    mock/
      mockData.js
      mockApi.js
  utils/
    formatters.js
    storage.js
  config/
    constants.js
    openapi-notes.md
  hooks/
    useChats.js
    useAgents.js
    useContent.js

Mock API
When REACT_APP_USE_MOCK_API=true, the app uses mock services that return predictable data without needing a backend. This enables immediate local development.

Styling
- Theme variables defined in src/theme/theme.css
- Ocean Professional palette
  - primary: #2563EB (blue)
  - secondary: #F59E0B (amber)
  - error: #EF4444
  - background: #f9fafb
  - surface: #ffffff
  - text: #111827
- Subtle shadows, rounded corners, transitions

Accessibility
- Keyboard navigable components
- ARIA labels for interactive elements
- Color contrasts tuned for readability

Connect to Backend
- Ensure REACT_APP_API_BASE_URL points to chatbot_backend
- API service methods:
  - chatService:
    - listChats()
    - getChat(chatId)
    - sendMessage({chatId, message, agentId})
    - createChat({title, agentId})
  - agentsService:
    - listAgents()
    - getAgent(agentId)
  - contentService:
    - listContent({query, tags})
    - getContent(contentId)

License
MIT
