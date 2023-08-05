// import LoginForm from "./components/loginForm/LoginForm"


import LoginForm from "./components/loginForm/LoginForm"
import ChangeMode from "./components/changeMode/ChangeMode"
import LanguageSelector from "./components/selectLanguage/selectLanguage"
import UserProfile from "./components/userProfile/UserProfile"
import { ContextProvider } from "./provider/ContextProvider"
// import UserProfile from "./components/userProfile/UserProfile"

function App() {

  return (
    <>
    <ContextProvider>
      <ChangeMode/>
      <LanguageSelector/>
      <UserProfile/>

    </ContextProvider>
      {/* <LoginForm />
      <UserProfile/>  */}

    </>
  )
}

export default App
