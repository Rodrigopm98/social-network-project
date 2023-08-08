import { useState, useContext } from "react";
import {
  RiHome2Line,
  RiCalendarEventLine,
  RiChat3Line,
  RiAccountCircleLine,
  RiSettings5Line,
} from "react-icons/ri";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";


const SideBar = ({ showMenu }) => {
  const [isClicked, setIsClicked] = useState(" ");
  // const [hidden, setHiddenMenu] = useState(false)
  const { logged_id } = useAuthStore()
  const context = useContext(Context);
  const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
  const textColor = context.clearTheme ? "600" : "100"
  const sideHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;



  const handleClickHome = () => {
    setIsClicked("home");
  };

  const handleClickAccount = () => {
    setIsClicked("account")
  }

  const handleClickEvents = () => {
    setIsClicked("events")
  }

  const handleClickChat = () => {
    setIsClicked("chat")
  }

  const handleClickSettings = () => {
    setIsClicked("settings")
  }

  /* const selected = ()=>{ if(isClicked != " " && showMenu){
    setIsClicked(" ")
    setHiddenMenu(true)
  }else{
    setHiddenMenu(false)
   }}

   selected() 
   
    ${ hidden ? " hidden " : " "} */

  return (
    <>
      <nav
        className={`${themeBackground} md:left-0 fixed w-20 top-14 bottom-0 h-90 text-center ${ showMenu ? "  " : " -left-full" }`}
      >
        <ul className={`flex flex-col justify-between text-4xl pl-5 text-black-${textColor}`}>
          <li
            onClick={handleClickHome}
            title="Inicio"
            className={`my-4 md:my-6 lg:my-8 
        rounded-tl-xl rounded-bl-xl ${sideHoverButtonBackground} w-full pt-2 pb-2 ${ isClicked == "home" ? "bg-black-50" : " " }`}
          >
            <Link to={'/home'}>
              <RiHome2Line />
            </Link>
          </li>
          <li
            onClick={handleClickAccount}
            title="Perfil"
            className={`my-4 md:my-6 lg:my-8 
        rounded-tl-xl rounded-bl-xl hover:bg-[#ffffff] w-full pt-2 pb-2 ${ isClicked == "account" ? "bg-black-50" : " " }`}
          >
            <Link to={`/home/user/${logged_id}`}>
              <RiAccountCircleLine />
            </Link>
          </li>
          <li
            onClick={handleClickEvents}
            title="Eventos"
            className={`my-4 md:my-6 lg:my-8 
        rounded-tl-xl rounded-bl-xl hover:bg-[#ffffff] w-full pt-2 pb-2 ${ isClicked == "events" ? "bg-black-50" : " "}`}
          >
            <Link to={'#'}>
              <RiCalendarEventLine />
            </Link>
          </li>
          <li
            onClick={handleClickChat}
            title="Chat"
            className={`my-4 md:my-6 lg:my-8 
        rounded-tl-xl rounded-bl-xl hover:bg-[#ffffff] w-full pt-2 pb-2 ${ isClicked == "chat" ? "bg-black-50" : " "}`}
          >
            <Link to={'/home/chat'}>
              <RiChat3Line />
            </Link>
          </li>
          <li
            onClick={handleClickSettings}
            title="Configuracion"
            className={`mt-4 md:mt-6 lg:mt-8 
        rounded-tl-xl rounded-bl-xl hover:bg-[#ffffff] w-full pt-2 pb-2 ${ isClicked == "settings" ? "bg-black-50" : " "}`}
          >
            <Link to={'/home/config'}>
              <RiSettings5Line />
            </Link>
          </li>
        </ul>
      </nav>
      {/* mobile */}
      
    </>
  );
};

export default SideBar;
