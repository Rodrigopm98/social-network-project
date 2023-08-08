import { useState } from 'react';
import PropTypes from 'prop-types';
import useModal from '../../hooks/useModal';
import Modal from "../Modal/Modal"
import axios from 'axios';
import { useNavigate } from 'react-router';

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showModal, closeModal, modalTitle, modalMessage, showModalWindow } = useModal();

  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const MIN_PASSWORD_LENGTH = 6;

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUserName = (userName) => {
    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    return userNameRegex.test(userName);
  };

  const handleRegister = async () => {
    const today = new Date();
    const birthDateValue = new Date(birthdate);
    let age = today.getFullYear() - birthDateValue.getFullYear();
    const monthDiff = today.getMonth() - birthDateValue.getMonth();

    const newUser = {
      id_rol: 1, //Aquí iría el id del usuario con el estado global
      email: email,
      password: password,
      user_name: username,
      birthday: birthdate,
      gender: gender,
    };
    if (!email || !password || !username || !confirmPassword) {
      showModal('Error', 'Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      showModal("Passwords don't match", "Please make sure the passwords match and try again.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      showModal("Password too short", "Password must have at least 6 characters.");
      return;
    }
    if (!isValidUserName(username)) {
      showModal('Invalid Username', 'Username can only contain letters, numbers, and underscores.');
      return;
    }
    if (!birthdate) {
      showModal('Error', 'Please enter your birthdate.');
      return;
    }
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateValue.getDate())) {
      age--;
    }

    if (age < 18) {
      showModal('Invalid Age', 'You must be at least 18 years old to register.');
      return;
    }

    if (gender !== 'male' && gender !== 'female' && gender !== 'custom') {
      showModal('Error', 'Please select a gender.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/registro', newUser)

      if (response.status === 201) {
        // const userData = response.data;

        // login(userData) estado global
        navigate('/home')
      } else {
        showModal('Error', 'An error occurred')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showModal('Error', 'Please fill in all required fields.')
      } else if (error.response && error.response.status === 409) {
        showModal('Invalid account', 'Account already created')
      } else {
        showModal('Error', 'Server error')
      }
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md md:w-4/5 lg:w-2/5">
        <h1 className="text-2xl font-bold mb-4">Let&apos;s Register</h1>
        <h2 className="text-lg text-gray-600 mb-4">It&apos;s easy and fast</h2>
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm your password"
        />
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        {/* fecha de nacimiento */}
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          placeholder="Enter your birthdate"
        />

        {/* checkbox sexo */}
        <label>
          <input
            type="checkbox"
            value="male"
            checked={gender === 'male'}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label>
          <input
            type="checkbox"
            value="female"
            checked={gender === 'female'}
            onChange={handleGenderChange}
          />
          Female
        </label>
        <label>
          <input
            type="checkbox"
            value="custom"
            checked={gender === 'custom'}
            onChange={handleGenderChange}
          />
          Custom
        </label>

        <div className="flex justify-end">
          <button
            className="bg-[#25fc98]  hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      {showModalWindow && (
        <Modal
            modalTitle={modalTitle}
            modalMessage={modalMessage}
            onClose={() => closeModal()}
        />
      )}
    </div>

  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default RegisterForm;



