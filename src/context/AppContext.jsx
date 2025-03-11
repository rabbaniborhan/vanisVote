import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);
  const value = { darkMode, setDarkMode };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
