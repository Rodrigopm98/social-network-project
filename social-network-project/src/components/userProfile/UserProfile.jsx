import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from "../../context/Context";
import { useTranslate } from "../../hooks/useTranslate";
import { Translations } from "../../translations/translations";
import Spinner from "../spinner/Spinner";
import { useEffect, useState, useContext } from "react";
import NewPost from '../newPost/NewPost';
import useAuthStore from '../../store/useAuthStore';
import Restricted from '../../pages/restricted/Restricted';

const DEFAULT_IMG = 'https://static.vecteezy.com/system/resources/previews/002/519/144/non_2x/social-media-avatar-free-vector.jpg'


const UserProfile = () => {
    const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const [userData, setUserData] = useState(null);
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const { isLoggedIn } = useAuthStore()


    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`http://localhost:3000/auth/user/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        }

        setPosts([])
        async function fetchPosts() {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);

                const sortedPosts = response.data.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error al obtener los posteos:', error);

            }
        }

        fetchUserData();
        fetchPosts();
    }, [id]);

    if(!isLoggedIn){
        return <Restricted />
    }

    if (!userData || !posts) {
        return <Spinner />;
    }

    const themeBackground = context.clearTheme ? "bg-black-50" : "bg-[#444444]";

    const utcDateFromApi = new Date(userData.birthday);
    const utcMilliseconds = utcDateFromApi.getTime();
    const millisecondsInDay = 60 * 60 * 1000;
    const nextDayMilliseconds = utcMilliseconds + millisecondsInDay;
    const nextDayDate = new Date(nextDayMilliseconds);
    const day = nextDayDate.getUTCDate();
    const month = nextDayDate.getUTCMonth() + 1; 
    const year = nextDayDate.getUTCFullYear();
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return (
        <div
            className={`mt-10 flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${themeBackground}`}
        // style={{ backgroundColor: themeBackground }}
        >
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                {userData.profile_picture ? <img src={userData.profile_picture} className="w-24 h-24 rounded-full" alt={userData.user_name} /> : <img src={DEFAULT_IMG} className="w-24 h-24 rounded-full" alt={userData.user_name} />}
            </div>
            <h1 className="text-4xl font-bold mt-6 text-gray-500">
                {userData.user_name}
            </h1>
            <div className="flex items-center space-x-2 mb-4 mt-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM10 2a6 6 0 100 12 6 6 0 000-12z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="text-sm text-gray-500">E-mail: {userData.email}</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm2-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <p className="text-sm text-gray-500">
                    {translations.birthday}: {formattedDate}
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zM10 2a6 6 0 100 12 6 6 0 000-12z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="text-sm text-gray-500">
                    {translations.gender}: {userData.gender}
                </p>
            </div>
            {posts.length > 0 ? (
                <div className="mt-4 w-2/3">
                    {posts.map((post) => (
                        <NewPost key={post.id_posts} post={post} />
                    ))}
                </div>
            ) : (
                <div className="mt-4">
                    <h1>Este usuario no tiene posteos realizados.</h1>
                </div>
            )}

        </div>
    );
};

export default UserProfile;
