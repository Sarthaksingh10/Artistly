"use client";
import { createContext, useContext, useState, useEffect } from "react";
/* creating the context */
export const ThemeContext = createContext();

/* creating the provider which will wrap the application to provide context */
export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);

  const toggleMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", lightMode);
  }, [lightMode]);

  return (
    <ThemeContext.Provider value={{ lightMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* using the context values in the applications */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("context is called outside the provider");

  return context;
};
