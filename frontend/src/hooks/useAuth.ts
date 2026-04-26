import { useState, useCallback, useEffect } from 'react';
import { validateToken } from '@/api/products';

const TOKEN_KEY = 'admin_token';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) return;
    validateToken(stored).then(valid => {
      if (valid) {
        setToken(stored);
        setIsAuthed(true);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    });
  }, []);

  const login = useCallback((password: string) => {
    localStorage.setItem(TOKEN_KEY, password);
    setToken(password);
    setIsAuthed(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsAuthed(false);
  }, []);

  return { token, isAuthed, login, logout };
}
