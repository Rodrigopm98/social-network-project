import Chat  from "../components/chat/Chat"
import useAuthStore from "../store/useAuthStore"
import Restricted from "../pages/restricted/Restricted"

export default function ChatRouter(){
    const { isLoggedIn } = useAuthStore()

    if(!isLoggedIn){
        return <Restricted />
    }
    return (
        <Chat/>
    )
}