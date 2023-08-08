import PropTypes from 'prop-types';

const Modal = ({ onClose, modalTitle, modalMessage }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="text-lg font-bold mb-4 text-center">{modalTitle}</h1>
        <p className="mb-4 text-center">{modalMessage}</p>
        <button
          className="w-full bg-[#25fc98] hover:bg-[#15b575] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalMessage: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired


}
export default Modal