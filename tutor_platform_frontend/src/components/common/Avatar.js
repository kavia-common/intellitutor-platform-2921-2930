import React from 'react';

// PUBLIC_INTERFACE
export default function Avatar({ size = 32, name = 'U', color = 'var(--primary)' }) {
  /** Simple initial-based avatar */
  const initials = String(name || 'U').slice(0, 2).toUpperCase();
  return (
    <div
      aria-label={`Avatar ${name}`}
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: 'var(--gradient)',
        border: '1px solid var(--border)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        fontWeight: 700,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {initials}
    </div>
  );
}
