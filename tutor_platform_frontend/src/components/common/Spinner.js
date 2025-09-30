import React from 'react';

// PUBLIC_INTERFACE
export default function Spinner({ size = 16 }) {
  /** Minimal spinner */
  const border = Math.max(2, Math.round(size / 8));
  return (
    <span
      role="status"
      aria-live="polite"
      style={{
        width: size,
        height: size,
        border: `${border}px solid rgba(0,0,0,0.1)`,
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}
