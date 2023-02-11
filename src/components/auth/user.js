import { useRouter } from 'next/router';
import React from 'react';

import queryClient from '../../lib/query-client';

const FAKE_USERS = [
  {
    username: 'jj',
    id: '123',
  },
  {
    username: 'eric',
    id: '456',
  },
  {
    username: 'sierra',
    id: '789',
  },
];

const UserContext = React.createContext({
  user: null,
  login: null,
  logout: null,
});

export function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  const login = React.useCallback((username) => {
    if (!username) return;

    const knownUser = FAKE_USERS.find((_user) => _user.username === username);

    if (knownUser) {
      localStorage.setItem('username', knownUser.username);
      setUser(knownUser);
    }
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem('username');
    setUser(null);
    queryClient.clear();
    router.push('/');
  }, [router]);

  React.useEffect(() => {
    login(localStorage.getItem('username'));
  }, [login]);

  const context = React.useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export const useUser = () => React.useContext(UserContext);
