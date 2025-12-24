import React, { createContext, useState, useEffect } from 'react';

// Kullanıcı bağlamı oluştur
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setUserName(parsedUser.name);
      setIsAdmin(parsedUser.role === 'admin');
    }
  }, []); 

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
