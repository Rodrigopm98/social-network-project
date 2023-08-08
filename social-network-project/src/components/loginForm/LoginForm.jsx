
import { useState, useContext } from 'react';
import { Eye, EyeOff } from 'react-feather';
import RegisterForm from '../registerForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import useAuthStore from '../../store/useAuthStore';
import SelectLanguage from "../selectLanguage/SelectLanguage"
import ChangeMode from "../changeMode/ChangeMode"
import { useTranslate } from '../../hooks/useTranslate';
import { Translations } from '../../translations/translations';
import { Context } from '../../context/Context';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const { showModal, closeModal, modalTitle, modalMessage, showModalWindow } = useModal();
  const { login } = useAuthStore();
  const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
    const textColor = context.clearTheme ? "600" : "100"


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleLogin = async() => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password })
        if (response.status === 200) {
          const userData = response.data;
          login(userData)
          navigate('/home')
        } else {
          showModal('Error', 'An error occurred')
        }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showModal('Cannot login', 'Wrong password')
      } else if (error.response && error.response.status === 404) {
        showModal('Cannot login', 'User not found')
      } else {
        showModal('Error', 'An error ocurred')
      }
    }
  };

  return (
    <div className='min-h-screen '>
      <div className={`${themeBackground} flex justify-end p-3`}>
        <SelectLanguage/>
        <ChangeMode/>
      </div>
      <div className={`flex items-center justify-center min-h-screen ${themeBackground}`}>
      <div className="w-80 md:w-4/5 lg:w-2/5 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{translations.login}</h1>
        <div className="mb-4">
          <label className={`block text-gray-${textColor} text-sm font-bold mb-2`} htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-[#25fc98]"
            type="email"
            value={email}
            onChange={handleEmailChange}
            id="email"
            placeholder={translations.enterYourEmail}
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <label className= {`block text-gray-${textColor} text-sm font-bold mb-2`} htmlFor="password">
            {translations.password}
          </label>
          <div>
            <input
              className="w-full px-3 py-2 pl-10 border border-gray-100 rounded-md focus:outline-none focus:ring focus:border-[#15b575]"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              placeholder={translations.enterPassword}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>
        <div>
          <button
            className="w-full bg-[#25fc98] hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            {translations.login}
          </button>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-[#25fc98] hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={openRegisterModal}
          >
            {translations.creatNaccount}
          </button>
        </div>
        {showRegisterModal && <RegisterForm onClose={closeRegisterModal} />}
        {showModalWindow && (
        <Modal
            modalTitle={modalTitle}
            modalMessage={modalMessage}
            onClose={() => closeModal()}
        />
      )}
      </div>
    </div>

    </div>
    

  );
};

export default LoginForm;
