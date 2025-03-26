import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface MyContextProps {
  children: ReactNode;
}

interface DarkThemeProps {
  darkTheme: boolean;
  setDarkTheme: (darkTheme: boolean) => void;
}

const darkThemeContext = createContext(null as null | DarkThemeProps);

export function DarkThemeProvider({ children }: MyContextProps) {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("darkTheme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <darkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      {children}
    </darkThemeContext.Provider>
  );
}

export const useDarkTheme = () => {
  const context = useContext(darkThemeContext);

  if (context == null) {
    throw new Error("Un context doit être utilisé");
  }
  return context;
};
