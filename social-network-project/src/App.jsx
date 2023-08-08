<<<<<<< HEAD
// import LoginForm from "./components/loginForm/LoginForm"


import LoginForm from "./components/loginForm/LoginForm"
import ChangeMode from "./components/changeMode/ChangeMode"
import LanguageSelector from "./components/selectLanguage/selectLanguage"
import UserProfile from "./components/userProfile/UserProfile"
import { ContextProvider } from "./provider/ContextProvider"
// import UserProfile from "./components/userProfile/UserProfile"
=======
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar"
import { ContextProvider } from "./provider/ContextProvider";
>>>>>>> e51da7c12828c24d1fe0d09396f51e429fc9b7f6

function App() {
  
  return (
    <>
    <ContextProvider>
<<<<<<< HEAD
      <ChangeMode/>
      <LanguageSelector/>
      <UserProfile/>

    </ContextProvider>
      {/* <LoginForm />
      <UserProfile/>  */}

=======
      <NavBar/>
      <Outlet/>
    </ContextProvider>
      
>>>>>>> e51da7c12828c24d1fe0d09396f51e429fc9b7f6
    </>
  )
}

export default App
