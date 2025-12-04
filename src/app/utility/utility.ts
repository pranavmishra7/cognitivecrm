export function formatLabel(key: string): string {
  if (!key) return '';

  // Split by underscore and ignore empty pieces
  const parts = key.split('_').filter(p => p.trim().length > 0);

  // If at least 3 parts, remove form + section prefix
  if (parts.length >= 3) {
    parts.splice(0, 2); // remove first two identifiers
  }

  // Join remaining parts
  const text = parts.join(' ');

  // Capitalize each word
  return text.replace(/\b\w/g, c => c.toUpperCase());
}

export function toHtmlId(key: string): string {
  if (!key) return '';
  return key
    .trim()
    .replace(/[^\w]+/g, '_')   // non-word chars to _
    .replace(/_+/g, '_')       // collapse multiple underscores
    .toLowerCase();
}
