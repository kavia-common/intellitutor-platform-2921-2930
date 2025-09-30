import React from "react";

// PUBLIC_INTERFACE
export default function Header({ theme, onToggleTheme, user }) {
  /** Top navigation header with brand, search placeholder, theme toggle, and user avatar. */
  return (
    <header className="it-header">
      <div className="brand">
        <div className="logo">🎓</div>
        <div className="brand-text">
          <span className="title">IntelliTutor</span>
          <span className="subtitle">Ocean Professional</span>
        </div>
      </div>

      <div className="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search lessons, topics, or resources..."
          aria-label="Global search"
        />
      </div>

      <div className="actions">
        <button
          className="btn-ghost"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <div className="avatar" title={user?.name || "You"}>
          {user?.initials || "YU"}
        </div>
      </div>
    </header>
  );
}
