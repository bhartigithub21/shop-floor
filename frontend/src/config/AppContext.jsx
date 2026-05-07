import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [psline, setPsline] = useState(null);

  const value = {
    user,
    setUser,
    psline,
    setPsline,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
