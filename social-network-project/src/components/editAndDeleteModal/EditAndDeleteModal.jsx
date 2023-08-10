import { useState, useContext } from 'react';
import axios from 'axios';
import { useTranslate } from '../../hooks/useTranslate';
import { Translations } from '../../translations/translations';
import { Context } from '../../context/Context';

const EditAndDeleteModal = ({ isEdit, onClose, content, id_posts }) => {
    const [editedContent, setEditedContent] = useState(content);
    const [errorMessage, setErrorMessage] = useState('')
    const context = useContext(Context);
    const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#555555]";
    const textColor = context.clearTheme ? "text-black-600" : "text-white";

    const handleEdit = async () => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/posts/${id_posts}`, { content: editedContent });

            if (response.status === 200) {
                onClose();
            } else {
                setErrorMessage(translations.errorEdit);
            }
        } catch (error) {
            setErrorMessage(translations.errorEdit);
        }
    };

    const handleDelete = async () => {
        try {
            axios.delete(`http://localhost:3000/api/posts/${id_posts}`)
            onClose();
        } catch (error) {
            setErrorMessage(translations.errorDelete);
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className={`fixed inset-0 bg-black opacity-50`}></div>
            <div className={`${themeBackground} p-4 rounded-lg z-10 w-64 shadow`}>
                <div className="mb-4">
                    <h2 className={`${textColor} text-lg font-semibold`}>{isEdit ? translations.editPost : translations.deletePost}</h2>
                </div>
                <div className="mb-4">
                    {
                    isEdit ? (<>
                    <label className="block text-sm font-medium mb-1">{translations.contentLabel}</label>
                        <textarea
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        ></textarea>
                    </>)
                        : <p className={textColor}>{translations.areYouSure}</p>
                    }
                    {errorMessage != '' ? <p className='text-red-600'>{errorMessage}</p> : null}
                </div>
                <div className="flex justify-end">
                    <button
                        className="mr-2 px-4 py-2 text-sm font-medium text-white bg-[#25fc98] hover:bg-[#15b575] rounded-md"
                        onClick={isEdit ? handleEdit : handleDelete}
                    >
                        {isEdit ? translations.save : translations.delete}
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-100 rounded-md border border-gray-400"
                        onClick={onClose}
                    >
                        {translations.cancel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAndDeleteModal;
