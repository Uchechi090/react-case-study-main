/**
 * useUrlState Hook
 * Syncs state with URL query parameters for shareable/bookmarkable URLs
 *
 * Features:
 * - Reads initial state from URL params on mount
 * - Updates URL when state changes (without page reload)
 * - Maintains browser history for back/forward navigation
 * - Type-safe parameter handling
 *
 * Usage:
 * const [value, setValue] = useUrlState('key', 'defaultValue');
 */

import { useState, useEffect } from 'react';

export const useUrlState = <T extends string>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  // Initialize state from URL or use default
  const [state, setState] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlValue = params.get(key);
    return (urlValue as T) || defaultValue;
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (state === defaultValue) {
      // Remove param if it's the default value to keep URL clean
      params.delete(key);
    } else {
      params.set(key, state);
    }

    // Update URL without triggering page reload
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [key, state, defaultValue]);

  return [state, setState];
};

/**
 * useUrlNumberState Hook
 * Syncs numeric state with URL query parameters
 * Similar to useUrlState but handles numbers
 */
export const useUrlNumberState = (
  key: string,
  defaultValue: number
): [number, (value: number) => void] => {
  const [state, setState] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlValue = params.get(key);
    return urlValue ? parseInt(urlValue, 10) : defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (state === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, state.toString());
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  }, [key, state, defaultValue]);

  return [state, setState];
};
