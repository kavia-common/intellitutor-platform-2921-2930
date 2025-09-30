import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import './theme/theme.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainPanel from './components/layout/MainPanel';
import ChatPage from './pages/ChatPage';
import ContentPage from './pages/ContentPage';

// PUBLIC_INTERFACE
function App() {
  /** Root application shell with Ocean Professional theme and two-pane layout. */
  const location = useLocation();

  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        <Sidebar />
        <MainPanel>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="*" element={<Navigate to="/chat" replace />} />
          </Routes>
        </MainPanel>
      </div>
    </div>
  );
}

export default App;
