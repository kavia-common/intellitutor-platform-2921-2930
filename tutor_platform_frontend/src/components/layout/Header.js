import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { useTheme } from '../../theme/ThemeProvider';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top header with brand, navigation, and theme toggle */
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const Tab = ({ to, label }) => {
    const active = location.pathname.startsWith(to);
    return (
      <Link to={to} className="btn" style={active ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : {}}>
        {label}
      </Link>
    );
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-badge" />
          <div>
            Tutor Platform
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Ocean Professional</div>
          </div>
        </div>
        <nav className="row">
          <Tab to="/chat" label="Chat" />
          <Tab to="/content" label="Content" />
        </nav>
        <div className="header-actions">
          <Button kind="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </Button>
          <Button className="pill" aria-label="Notifications">🔔</Button>
          <Avatar size={32} name="JD" />
        </div>
      </div>
    </header>
  );
}
