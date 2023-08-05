import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/not-found/NotFound";
import Container from "../components/container/Container";
import LoginForm from "../components/loginForm/LoginForm";
import UploadPicture from "../components/uploadPicture/UploadPicture";
import UserProfile from "../components/userProfile/UserProfile";

export const browserRouter = createBrowserRouter([
    {
        path: '/',
        element: <LoginForm />,
        errorElement: <NotFound />,
        children: [
            {
                children: [
                    {
                        element: <Container />
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        element: <LoginForm />,
        errorElement: <NotFound />,
        index: true,
    },
    {
        path: '/home',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/home/*',
                element: <Container/>,
                index: true
            },
            {
                path: '/home/config',
                element: <UploadPicture />,       
            },
            {
                path: '/home/user/:id',
                element: <UserProfile />,       
            }     
        ]
    }
])