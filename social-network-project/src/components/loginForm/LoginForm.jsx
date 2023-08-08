import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import RegisterForm from '../registerForm/RegisterForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';
import useAuthStore from '../../store/useAuthStore'
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const { showModal, closeModal, modalTitle, modalMessage, showModalWindow } = useModal();
  const { login } = useAuthStore();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 md:w-4/5 lg:w-2/5 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            value={email}
            onChange={handleEmailChange}
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6 relative flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password:
          </label>
          <div>
            <input
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              id="password"
              placeholder="Enter your password"
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
            Login
          </button>
        </div>
        <div className="mt-4">
          <button
            className="w-full bg-[#25fc98] hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={openRegisterModal}
          >
            Create New Account
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

  );
};

export default LoginForm;
