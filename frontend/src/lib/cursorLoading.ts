// Utility to trigger cursor loading state from anywhere
// Usage: import { startCursorLoading, stopCursorLoading } from "@/src/lib/cursorLoading";

export function startCursorLoading() {
  window.dispatchEvent(new CustomEvent("cursor-loading-start"));
}

export function stopCursorLoading() {
  window.dispatchEvent(new CustomEvent("cursor-loading-stop"));
}
