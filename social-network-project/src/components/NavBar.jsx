import { RiSearchLine, RiMenuLine } from "react-icons/ri";
import { useState, useContext} from "react";
import useAuthStore from '../store/useAuthStore'
import SideBar from "./SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { useTranslate } from "../hooks/useTranslate";
import { Translations } from "../translations/translations";
import SelectLanguage from "../components/selectLanguage/selectLanguage"
import ChangeMode from "../components/changeMode/ChangeMode"


const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const [filterUser, setFilterUser] = useState('');
    const navigate = useNavigate()
    const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
    const textColor = context.clearTheme ? "600" : "100"
    const navbarHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;
    const { isLoggedIn } = useAuthStore()


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleChange = (e) => {
        setFilterUser(e.target.value)
    }

    const getUserIdFromFilterUser = async(filterUser) => {
        try {
            const response = await axios.get('http://localhost:3000/auth/users');
            const userList = response.data;
            
            const filteredUsers = userList.filter(user => user.user_name.includes(filterUser));
            
            if (filteredUsers.length > 0) {
                return filteredUsers[0].id_user;
            }
        
            return null;
          } catch (error) {
            console.error('Error:', error);
            return null;
          }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const userId = await getUserIdFromFilterUser(filterUser);

        navigate(`/home/user/${userId}`)
    }

    return (
        <>
            <nav className={`${themeBackground} w-full fixed top-0 h-14 text-center flex justify-between items-center`}
      >
                <h1 className=" w-20 hidden lg:block">LOGO</h1>
                <button onClick={toggleMenu} className={`md:hidden text-4xl ml-2 text-black-600`}><RiMenuLine /></button>
                <form className=" relative w-1/2">
                    <input type="text" placeholder={translations.searchUser}
                        className=" rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-black-500 w-full"
                        onChange={handleChange} value={filterUser} />
                    <button className="absolute right-0 top-1 mt-2 mr-3" onClick={handleSubmit}><RiSearchLine /></button>
                </form>

                <ul className="flex justify-end items-center w:2/4 md:w-1/3 ">
                    <li className={`text-4xl md:mr-4 text-black-${textColor} ${navbarHoverButtonBackground} rounded-lg`} ><SelectLanguage/></li>
                    <li className={`text-4xl md:mr-4 text-black-${textColor} ${navbarHoverButtonBackground} rounded-lg`}><ChangeMode/></li>
                    {
                        isLoggedIn ?  <li><button className="mr-4 bg-[#25fc98] text-white hover:bg-[#15b575] px-4 py-2 rounded-lg shadow-md" onClick={handleLogout}>{translations.signOff}</button></li>: 
                        null    
                    }
                   
                </ul>
            </nav>
            <SideBar showMenu={showMenu} />
        </>
    )
}
export default NavBar