import { ContextProvider } from "./provider/ContextProvider"
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar"


function App() {
  
  return (
    <>
    <ContextProvider>
      <NavBar/>
      <Outlet/>
    </ContextProvider>
      
    </>
  )
}

export default App
