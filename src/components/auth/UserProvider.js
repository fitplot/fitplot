import React from 'react';

const FAKE_USERS = [
  {
    username: 'justin',
    id: '123',
  },
  {
    username: 'eric',
    id: '456',
  }
];

const UserContext = React.createContext({
  user: null,
  login: null
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const login = useCallback((username) => {
    if (!username) return;
    
    const user = FAKE_USERS.find((u) => u.username === username);

    if (user) {
      setUser(user);
    }
  });

  const context = {
    user,
    login,
  };

  return (
    <UserContext.Provider value={context}>
      { children }
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
