import { createContext, useContext } from 'react';

interface AuthContextValue {
  token: string | null;
  isAuthed: boolean;
  isAuthLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  token: null,
  isAuthed: false,
  isAuthLoading: true,
  login: () => {},
  logout: () => {},
});

export function useAuthContext() {
  return useContext(AuthContext);
}
