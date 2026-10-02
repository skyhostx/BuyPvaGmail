import type { MouseEvent } from 'react';

/**
 * Checks whether a mouse click event is modified by keyboard modifier keys
 * (Ctrl, Meta/Command, Shift, Alt) or is not a primary left click (e.g. middle click).
 * When true, callers MUST NOT call e.preventDefault() so the browser can natively
 * open the link in a new tab, new window, or handle native behavior.
 */
export function isModifiedEvent(e: MouseEvent<HTMLElement>): boolean {
  return Boolean(
    e.metaKey || 
    e.altKey || 
    e.ctrlKey || 
    e.shiftKey || 
    (e.button !== undefined && e.button !== 0)
  );
}

/**
 * Safe link click handler that allows Ctrl+Click, Cmd+Click, Shift+Click,
 * and middle-click to open in a new tab/window natively, while executing the SPA
 * navigation callback on standard unmodified left clicks.
 */
export function handleLinkClick(
  e: MouseEvent<HTMLElement>,
  onNavigate: () => void
): void {
  if (isModifiedEvent(e)) {
    // Let the browser perform its native default action (e.g. open in new tab)
    return;
  }
  e.preventDefault();
  onNavigate();
}
