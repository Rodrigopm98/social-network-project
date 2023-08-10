import { useState, useContext } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { Translations } from '../../translations/translations';
import { useTranslate } from '../../hooks/useTranslate';
import { Context } from '../../context/Context';
import Restricted from '../../pages/restricted/Restricted';
import upload from '../../assets/upload.jpg'
import useModal from '../../hooks/useModal';
import Modal from '../Modal/Modal';

export default function UploadPicture() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);
  const { logged_id, isLoggedIn } = useAuthStore()
  const context = useContext(Context);
  const translations = useTranslate(Translations(context));
  const themeBackground = context.clearTheme ? "bg-black-50" : "bg-[#444444]";
  const textColor = context.clearTheme ? "text-black-600" : "text-white"
  const { showModal, closeModal, modalTitle, modalMessage, showModalWindow } = useModal();


  const handleFileChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile != null) {
      //sube la imagen al storage de firebase y la guarda en una carpeta user por cada usuario, con todas las fotos que el usuario subió.
      const imageRef = ref(storage, `/user-${logged_id}/image-${Date.now()}`)
      uploadBytes(imageRef, selectedFile).then(() => {
        getDownloadURL(imageRef).then((url) => {
          //obtiene la URL de firebase y la guarda en la base de datos.
          setUrl(url)
          axios.patch(`http://localhost:3000/auth/user/${logged_id}`, {
            profile_picture: url
          })
        })
          .catch(() => {
            showModal('Error', "Error obteniendo la imagen");
          })
        setSelectedFile(null)
      }).catch(() => {
        showModal('Error', "Error obteniendo la imagen");
      })
    } else {
      showModal('Error', 'Primero seleccione una foto.')
    }
  };

  if (!isLoggedIn) {
    return <Restricted />
  }

  return (
    <div className={`h-screen max-w-xs mx-auto flex flex-col justify-center ${themeBackground}`}>
      <label className={`block mb-2 ${textColor}`}> {translations.selectPicture} </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full mb-4 p-2 border rounded"
        name="profilePicture"
      />
      {url ? <img src={url} className="w-32 h-32 rounded-full object-cover mx-auto border" /> : <img src={upload} className="w-32 h-32 rounded-full object-cover mx-auto border" />}
      <button onClick={handleUpload} className="m-4 w- bg-[#25fc98] text-white hover:bg-[#15b575] px-4 py-2 rounded-lg shadow-md">{translations.upload}</button>
      {showModalWindow && (
        <Modal
          modalTitle={modalTitle}
          modalMessage={modalMessage}
          onClose={() => closeModal()}
        />
      )}
    </div>
  );
}
