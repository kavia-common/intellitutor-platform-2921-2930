import React from 'react';

// PUBLIC_INTERFACE
export default function Toggle({ checked, onChange, label }) {
  /** Accessible toggle switch */
  return (
    <label className="row" style={{ gap: 8, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-label={label}
        style={{ display: 'none' }}
      />
      <span
        aria-hidden="true"
        style={{
          width: 40,
          height: 22,
          background: checked ? 'var(--primary)' : 'var(--border)',
          borderRadius: 999,
          position: 'relative',
          transition: 'all .2s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 22 : 3,
            width: 16,
            height: 16,
            background: '#fff',
            borderRadius: '50%',
            transition: 'left .2s ease',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      </span>
      {label && <span style={{ color: 'var(--text)' }}>{label}</span>}
    </label>
  );
}
```

````write file="intellitutor-platform-2921-2930/tutor_platform_frontend/src/components/common/EmptyState.js"
import React from 'react';
import Button from './Button';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'No data', description = '', actionLabel, onAction }) {
  /** General purpose empty state card */
  return (
    <div className="card" style={{ padding: 24, textAlign: 'center' }}>
      <div className="brand-badge" style={{ margin: '0 auto 12px' }} />
      <h3 style={{ margin: '8px 0' }}>{title}</h3>
      {description && <p style={{ color: 'var(--muted)' }}>{description}</p>}
      {actionLabel && (
        <div style={{ marginTop: 12 }}>
          <Button kind="primary" onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
