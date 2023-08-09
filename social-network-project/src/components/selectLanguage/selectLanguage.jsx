import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { FlagIcon } from "react-flag-kit";

const LANGUAGES = {
  en: "US",
  es: "ES",
  fr: "FR",
  // it: "IT",
  // ru: "RU",
  // zh: "CN",
  // pt: "PT"
};

const SelectLanguage = () => {
  const context = useContext(Context);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("selectedLanguage") || "en"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    context.setLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center ">
      <div className="relative flex justify-center items-center">
        <div onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center p-1">
            <FlagIcon code={LANGUAGES[selectedLanguage]} size={50} />
            <ChevronDownIcon className="ml-2 h-5 w-5" />
          </div>
        </div>
        {isOpen && (
          <div
            className={`absolute top-[100%] w-90% ${
              context.clearTheme ? "bg-brand-secondary" : "bg-brand-accent"
            } ${context.clearTheme ? "text-black" : "text-white"} ${
              context.clearTheme ? "border-black" : "border-white"
            } border-1 border-solid shadow-md z-10 rounded-5`}
          >
            {Object.keys(LANGUAGES).map((lang) => (
              <div
                className={`flex justify-center px-2 py-1 cursor-pointer hover:bg-${
                  context.clearTheme ? "brand-accent" : "brand-secondary"
                }`}
                key={lang}
                onClick={() => handleLanguageChange(lang)}
              >
                <div className="flex items-center">
                  <FlagIcon code={LANGUAGES[lang]} size={30} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectLanguage;
