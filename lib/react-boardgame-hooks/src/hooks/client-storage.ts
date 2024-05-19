import { useMemo } from 'react';

export function useClientStorage() {
  return useMemo(
    () => ({
      set: <T>(k: string, value: T): boolean => {
        if (!value) return false;
        localStorage.setItem(k, JSON.stringify(value));
        return true;
      },
      get: <T>(k: string): T | null => {
        const i = localStorage.getItem(k);
        if (!i) return null;
        return JSON.parse(i);
      },
      del: (k: string) => {
        localStorage.removeItem(k);
      },
    }),
    []
  );
}
