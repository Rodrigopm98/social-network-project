import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useModal from '../../hooks/useModal';
import Modal from "../Modal/Modal"
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Context } from '../../context/Context';
import { Translations } from '../../translations/translations';
import { useTranslate } from '../../hooks/useTranslate';
import useAuthStore from '../../store/useAuthStore';

const RegisterForm = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showModal, closeModal, modalTitle, modalMessage, showModalWindow } = useModal();
  const { login } = useAuthStore()
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-black-200";
    

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
      showModal(`${translations.invalidEmail}`, `${translations.enterenterValidEmail}`);
      return;
    }

    if (password !== confirmPassword) {
      showModal(`${translations.passwordsDoNotMatch}`, `${translations.passwordsMatchError}`);

      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      showModal(`${translations.passwordTooShort}`, `${translations.passwordLengthError}`);

      return;
    }
    if (!isValidUserName(username)) {
      showModal(`${translations.invalidUsername}`, `${translations.invalidUsernameError}`);
      return;
    }
    if (!birthdate) {
      showModal(`${translations.missingBirthdate}`, `${translations.missingBirthdateError}`);

      return;
    }
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateValue.getDate())) {
      age--;
    }

    if (age < 18) {
      showModal(`${translations.invalidAge}`, `${translations.ageRestrictionError}`);

      return;
    }

    if (gender !== 'male' && gender !== 'female' && gender !== 'custom') {
      showModal(`${translations.error}`, `${translations.selectGender}`);

      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/registro', newUser)

      if (response.status === 201) {
        const userData = response.data.user;
        console.log(response.data.user);
        login(userData)
        navigate('/home')
      } else {
      showModal(`${translations.error}`, `${translations.errorMessage}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showModal(`${translations.error}`, `${translations.fillRequiredFieldsMessage}`);
      } else if (error.response && error.response.status === 409) {
        showModal(`${translations.invalidAccountTitle}`, `${translations.invalidAccountMessage}`);
      } else {
        showModal(`${translations.error}`, `${translations.serverErrorMessage}`);

      }
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${themeBackground} p-6 rounded-md shadow-md md:w-4/5 lg:w-2/5`}>
        <h1 className="text-2xl font-bold mb-4">{translations.letsRegister}</h1>
        <h2 className="text-lg text-gray-600 mb-4">{translations.itsEasy}</h2>
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={translations.enterYourEmail}
        />
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={password}

          onChange={handlePasswordChange}
          placeholder={translations.enterPassword}
        />
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder={translations.confirmPassword}
        />
        <input
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder={translations.username}
        />
        {/* fecha de nacimiento */}
        <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-1">
            {translations.birthday}
        </label>
        <input
          className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          placeholder={translations.enterBirthdate}
        />

        <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-1">
                {translations.gender}
            </label>
            <label>
                <input
                    type="checkbox"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                />
                {translations.male}
            </label>
            <label>
                <input
                    type="checkbox"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                />
                {translations.female}
            </label>
            <label>
                <input
                    type="checkbox"
                    value="custom"
                    checked={gender === 'custom'}
                    onChange={handleGenderChange}
                />
                {translations.custom}
            </label>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-[#25fc98]  hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={handleRegister}
          >
            {translations.register}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            {translations.close}
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



