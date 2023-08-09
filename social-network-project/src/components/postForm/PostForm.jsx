import { useState, useContext } from 'react';
import { User, Send } from 'react-feather';
import axios from 'axios';
import { Context } from '../../context/Context';
import { Translations } from '../../translations/translations';
import { useTranslate } from '../../hooks/useTranslate';
import useAuthStore from '../../store/useAuthStore';

const PostForm = () => {
  const context = useContext(Context);
  const translations = useTranslate(Translations(context));
  const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
  // const textColor = context.clearTheme ? "600" : "100"
  const { logged_id } = useAuthStore()
  const [formData, setFormData] = useState({
    id_user: logged_id,
    content: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios
    .post('http://localhost:3000/api/posts', formData)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    setFormData({
      ...formData,
      content: "",
    });
  };

  return (
    <div className={`${themeBackground} p-4 rounded-lg shadow border border-blue-600  sm: w-full `}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        <div className="flex-grow">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-[#25fc98]"
            type="text"
            value={formData.content}
            name="content"
            onChange={handleInputChange}
            placeholder={translations.placeholderPf}
          />
        </div>
        <div className="flex-shrink-0">
          <button
            className="bg-[#25fc98] hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default PostForm;
