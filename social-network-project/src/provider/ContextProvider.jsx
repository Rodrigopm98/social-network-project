import { Context } from "../context/Context";
import { useState } from "react";
export const ContextProvider = ({ children }) => {
  const [clearTheme, setClearTheme] = useState(false)
  const [language, setLanguage] = useState("en");

  const context = {
    clearTheme: clearTheme,
    setClearTheme: setClearTheme,
    language: language,
    setLanguage: setLanguage,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
