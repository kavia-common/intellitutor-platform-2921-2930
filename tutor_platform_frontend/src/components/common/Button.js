import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ kind = 'default', children, className = '', ...props }) {
  /** Reusable button with variants: default, primary, ghost. */
  const base = 'btn';
  const variant = kind === 'primary' ? 'btn-primary' : kind === 'ghost' ? 'btn-ghost' : '';
  return (
    <button className={`${base} ${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
