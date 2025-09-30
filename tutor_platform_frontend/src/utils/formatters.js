 // PUBLIC_INTERFACE
export function truncate(text, max = 120) {
  /** Truncate text preserving word boundaries. */
  if (!text) return '';
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}
