import React from "react";
import { useRouter } from "next/router";

const FAKE_USERS = [
  {
    username: "jj",
    id: "123"
  },
  {
    username: "eric",
    id: "456"
  }
];

const UserContext = React.createContext({
  user: null,
  login: null,
  logout: null
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  const login = username => {
    if (!username) return;

    const user = FAKE_USERS.find(u => u.username === username);

    if (user) {
      localStorage.setItem("username", user.username);
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUser(null);
    router.push("/");
  };

  React.useEffect(() => {
    login(localStorage.getItem("username"));
  }, []);

  const context = {
    user,
    login,
    logout
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
