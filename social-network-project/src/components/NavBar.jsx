import { RiSearchLine, RiContrastFill, RiEmphasisCn, RiMenuLine } from "react-icons/ri";
import { useState } from "react";
import useAuthStore from '../store/useAuthStore'
import SideBar from "./SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const logout = useAuthStore((state) => state.logout);
    const [filterUser, setFilterUser] = useState('');
    const navigate = useNavigate()

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
            <nav className="bg-black-100 w-full fixed top-0 h-14 text-center flex justify-between items-center">
                <h1 className=" w-20 hidden lg:block">LOGO</h1>
                <button onClick={toggleMenu} className={`md:hidden text-4xl ml-5 text-black-600`}><RiMenuLine /></button>
                <form className=" relative w-1/2">
                    <input type="text" placeholder="Buscar usuario"
                        className=" rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-black-500 w-full"
                        onChange={handleChange} value={filterUser} />
                    <button className="absolute right-0 top-1 mt-2 mr-3" onClick={handleSubmit}><RiSearchLine /></button>
                </form>
                <ul className="flex justify-end items-center w:2/3 md:w-1/3 ">
                    <li className="text-4xl mr-4 text-black-600 hover:bg-[#ffffff] rounded-lg" ><a href="/" ><RiEmphasisCn /></a></li>
                    <li className="text-4xl mr-4 text-black-600 hover:bg-[#ffffff] rounded-lg"><a href="/"><RiContrastFill /></a></li>
                    <li><button className="mr-4 bg-[#25fc98] text-white hover:bg-[#15b575] px-4 py-2 rounded-lg shadow-md" onClick={handleLogout}>Cerrar sesión</button></li>
                    

                </ul>
            </nav>
            <SideBar showMenu={showMenu} />
        </>
    )
}
export default NavBar