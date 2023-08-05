import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from "../../context/Context";
import { useTranslate } from "../../hooks/useTranslate";
import { Translations } from "../../translations/translations";
import { useContext } from "react";

const UserProfile = () => {
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
};

export default UserProfile;
