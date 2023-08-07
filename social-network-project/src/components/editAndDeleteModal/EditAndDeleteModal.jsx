import { useState } from 'react';

const EditAndDeleteModal = ({ isEdit, onClose, onDelete, onEdit, content }) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    onEdit(editedContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-4 rounded-lg z-10 w-64">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{isEdit ? 'Editar Posteo' : 'Eliminar Posteo'}</h2>
        </div>
        {isEdit && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Contenido:</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows="4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md"
            onClick={isEdit ? handleEdit : onDelete}
          >
            {isEdit ? 'Guardar' : 'Eliminar'}
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md border border-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAndDeleteModal;
