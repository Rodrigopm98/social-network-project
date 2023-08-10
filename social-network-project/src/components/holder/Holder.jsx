import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Holder = () => {
    const context = useContext(Context);
    const themeBackground = context.clearTheme ? "bg-black-50" : "bg-[#444444]";

  
  return (
    <div className={themeBackground}>
      <NavBar/>
      <Outlet/>
      
    </div>
  )
}

export default Holder
