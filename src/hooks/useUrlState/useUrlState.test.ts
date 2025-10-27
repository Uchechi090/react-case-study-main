import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useUrlState, useUrlNumberState } from './useUrlState';

describe('useUrlState', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns default value when URL has no param', () => {
    const { result } = renderHook(() => useUrlState<string>('category', 'all'));

    expect(result.current[0]).toBe('all');
  });

  it('updates state and URL when setValue is called', () => {
    const { result } = renderHook(() => useUrlState<string>('category', 'all'));

    act(() => {
      result.current[1]('electronics');
    });

    expect(result.current[0]).toBe('electronics');
    expect(window.location.search).toContain('category=electronics');
  });

  it('removes param from URL when set to default value', () => {
    window.history.replaceState({}, '', '/?category=electronics');
    const { result } = renderHook(() => useUrlState<string>('category', 'all'));

    act(() => {
      result.current[1]('all');
    });

    expect(result.current[0]).toBe('all');
    expect(window.location.search).toBe('');
  });
});

describe('useUrlNumberState', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns default value when URL has no param', () => {
    const { result } = renderHook(() => useUrlNumberState('page', 1));

    expect(result.current[0]).toBe(1);
  });

  it('updates state and URL when setValue is called', () => {
    const { result } = renderHook(() => useUrlNumberState('page', 1));

    act(() => {
      result.current[1](3);
    });

    expect(result.current[0]).toBe(3);
    expect(window.location.search).toContain('page=3');
  });

  it('parses number from URL on mount', () => {
    window.history.replaceState({}, '', '/?page=5');
    const { result } = renderHook(() => useUrlNumberState('page', 1));

    expect(result.current[0]).toBe(5);
  });
});
