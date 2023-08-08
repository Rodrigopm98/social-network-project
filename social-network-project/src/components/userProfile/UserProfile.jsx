<<<<<<< HEAD
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
=======
>>>>>>> e51da7c12828c24d1fe0d09396f51e429fc9b7f6
import { Context } from "../../context/Context";
import { useTranslate } from "../../hooks/useTranslate";
import { Translations } from "../../translations/translations";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { useEffect, useState, useContext } from "react";

const DEFAULT_IMG = 'https://static.vecteezy.com/system/resources/previews/002/519/144/non_2x/social-media-avatar-free-vector.jpg'


const UserProfile = () => {
<<<<<<< HEAD
  const context = useContext(Context);
  const translations = useTranslate(Translations(context));
  const [userData, setUserData] = useState(null);
  const { id } = useParams()
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3000/auth/user/${id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg shadow ${context.clearTheme ? "bg-blue-500 text-black" : "bg-red-500 text-white"
      }`}>
      <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
        <img className="w-24 h-24 rounded-full" src={userData.profile_picture} alt="Profile" />
      </div>
      <h1 className="text-3xl font-bold mt-4">{userData.user_name}</h1>
      <p>Email: {userData.email}</p>
      <p>{translations.birthday}: {userData.birthday}</p>
      <p>{translations.gender}: {userData.gender}</p>
    </div>
  );
=======
    const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const [userData, setUserData] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:3000/auth/user/${id}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    if (!userData) {
        return <Spinner />;
    }

    const themeBackground = context.clearTheme ? "bg-withe" : "bg-[#333333]";

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
                <p className="text-sm text-gray-500">E-mail: {userData.gender}</p>
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
                    {translations.birthday}: {userData.birthday}
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
        </div>
    );
>>>>>>> e51da7c12828c24d1fe0d09396f51e429fc9b7f6
};

export default UserProfile;
