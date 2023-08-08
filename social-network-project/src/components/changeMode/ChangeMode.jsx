import { useContext } from "react";
import { Context } from "../../context/Context";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const ChangeMode = () => {
  const context = useContext(Context);

  const changeTheme = () => {
    context.setClearTheme(!context.clearTheme);
  };

  return (
    <button
      className={`text-2xl ${context.clearTheme ? "text-black" : "text-red"}`}
      onClick={changeTheme}
    >
      {context.clearTheme ? (
          <MoonIcon className="w-8 h-8" />
      ) : (
        <SunIcon className="w-8 h-8" />
      )}
    </button>
  );
};

export default ChangeMode;
