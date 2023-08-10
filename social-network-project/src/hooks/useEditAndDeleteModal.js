import { useState } from 'react';

const useEditAndDeleteModal = () => {
  const [showModalWindow, setShowModalWindow] = useState(false);

  const showModal = () => {
    setShowModalWindow(true);
  };

  const closeModal = () => {
    setShowModalWindow(false);
  };

  return {
    showModal,
    closeModal,
    showModalWindow,
  };
};

export default useEditAndDeleteModal;
