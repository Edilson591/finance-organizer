import { useCallback } from "react";

export const getTimeRemaining = (valueInitSeconds: number) => {
  const start = localStorage.getItem("forgotPasswordStart");

  if (!start) return;

  const startNumber = parseInt(start, 10);
  const durationNumber = valueInitSeconds * 1000;

  const elapsed = Date.now() - startNumber;
  const remaining = durationNumber - elapsed;

  return Math.max(Math.ceil(remaining / 1000), 0);
};
