import React from 'react';

// PUBLIC_INTERFACE
export default function MainPanel({ children }) {
  /** Main panel container frame. */
  return (
    <main className="main-panel">
      {children}
    </main>
  );
}
