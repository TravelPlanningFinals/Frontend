import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../services/users';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => setUser(user))
      .finally(() => setLoading(false));
  }, []);

  const contextValue = { user, loading };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext Provider');
  }
  return context;
};
export { UserProvider, useUser };
