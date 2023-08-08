import { useState } from 'react';
import axios from 'axios';

const EditAndDeleteModal = ({ isEdit, onClose, content, id_posts }) => {
    const [editedContent, setEditedContent] = useState(content);
    const [errorMessage, setErrorMessage] = useState('')

    const handleEdit = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/posts/${id_posts}`, { content: editedContent });

            if (response.status === 200) {
                onClose();
            } else {
                setErrorMessage('Hubo un error al editar el posteo.');
            }
        } catch (error) {
            setErrorMessage('Hubo un error al editar el posteo.');
        }
    };

    const handleDelete = async () => {
        try {
            axios.delete(`http://localhost:3000/api/posts/${id_posts}`)
            onClose();
        } catch (error) {
            setErrorMessage('Hubo un error al eliminar el posteo.');
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-4 rounded-lg z-10 w-64 shadow">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">{isEdit ? 'Editar Posteo' : 'Eliminar Posteo'}</h2>
                </div>
                <div className="mb-4">
                    {
                    isEdit ? (<>
                    <label className="block text-sm font-medium mb-1">Contenido:</label>
                        <textarea
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        ></textarea>
                    </>)
                        : <p>Estás seguro?</p>
                        
                    }
                    {errorMessage != '' ? <p className='text-red-600'>{errorMessage}</p> : null}
                </div>
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 text-sm font-medium text-white bg-[#25fc98] hover:bg-[#15b575] rounded-md"
                        onClick={isEdit ? handleEdit : handleDelete}
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
