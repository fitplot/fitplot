import { nanoid } from 'nanoid';
import React from 'react';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const dummy = {
    id: nanoid(),
    name: 'Rick Sanchez',
    email: 'rick.sanchez@nexus.com',
  };

  const [user] = React.useState(dummy);

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
