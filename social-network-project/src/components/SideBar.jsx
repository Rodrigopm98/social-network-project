import { useState, useContext, useEffect } from "react";
import {
  RiHome2Line,
  RiChat3Line,
  RiAccountCircleLine,
  RiSettings5Line,
} from "react-icons/ri";
import useAuthStore from "../store/useAuthStore";
import {NavLink } from "react-router-dom";
import { Context } from "../context/Context";

const SideBar = ({ showMenu }) => {
  const [isClicked, setIsClicked] = useState("home"); 
  const [hidden, setHiddenMenu] = useState(false)
  const { logged_id } = useAuthStore()
  const context = useContext(Context);
  const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#666666]";
  const textColor = context.clearTheme ? "600" : "100"
  const sideHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;
  const cliked = context.clearTheme ? "bg-black-50" : "bg-[#444444]" ;

  useEffect(()=>{
    setHiddenMenu(false) 
  },[showMenu])

  const handleHiddenMenu = (e)=>{
    e.preventDefault()
    setHiddenMenu(true)
  }

  const navItems = [
    { icon: RiHome2Line, path: '/home', name: 'home' },
    { icon: RiAccountCircleLine, path: `/home/user/${logged_id}`, name: 'account' },
    { icon: RiChat3Line, path: '/home/chat', name: 'chat' },
    { icon: RiSettings5Line, path: '/home/config', name: 'config' }
  ];

  return (
    <>
      <nav className={`${themeBackground} md:left-0 fixed w-20 top-14 bottom-0 h-90 text-center ${showMenu && !hidden ? "" : "-left-full"}`}>
        <ul className={`flex flex-col justify-between text-4xl pl-5 text-black-${textColor}`}>
          {navItems.map((item) => {
            const isItemClicked = isClicked === item.name;

            return (
          <li
                key={item.name}
            onClick={handleHiddenMenu}
                title={item.name}
                className={`my-4 md:my-6 lg:my-8 rounded-tl-xl rounded-bl-xl w-full pt-2 pb-2 ${sideHoverButtonBackground} ${isItemClicked ? cliked: ""}`}
          >
                <NavLink
                  to={item.path}
                  onClick={() => setIsClicked(item.name)}
          >
                  <item.icon />
            </NavLink>
          </li>
            );
          })}
        </ul>
      </nav>
      {/* mobile */}
    </>
  );
};

export default SideBar;






