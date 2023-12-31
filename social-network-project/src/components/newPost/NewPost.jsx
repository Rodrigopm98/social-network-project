import PropTypes from 'prop-types';
import { format, utcToZonedTime } from 'date-fns-tz'
import { BsPencilSquare } from 'react-icons/bs'
import { GoTrash } from 'react-icons/go'
import useAuthStore from '../../store/useAuthStore';
import useEditAndDeleteModal from '../../hooks/useEditAndDeleteModal'
import { useState } from 'react';
import EditAndDeleteModal from '../editAndDeleteModal/EditAndDeleteModal';
import { useContext } from 'react';
import { Context } from '../../context/Context';


const DEFAULT_IMG = 'https://static.vecteezy.com/system/resources/previews/002/519/144/non_2x/social-media-avatar-free-vector.jpg'

const NewPost = ({ post }) => {

    const utcDateFromApi = new Date(post.publication_date);
    const timeZone = 'America/Argentina/Buenos_Aires';
    const zonedDate = utcToZonedTime(utcDateFromApi, timeZone);
    const { logged_id } = useAuthStore();
    const formattedDate = format(zonedDate, 'MMMM dd, yyyy HH:mm', { timeZone });
    const { showModal, closeModal, showModalWindow } = useEditAndDeleteModal();
    const [isEdit, setIsEdit] = useState(false);
    const context = useContext(Context);
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";

    const textColor = context.clearTheme ? "text-black-600" : "text-white"

    const handleEdit = () => {
        setIsEdit(true);
        showModal();
    };

    const handleDelete = () => {
        setIsEdit(false)
        showModal();
    }

    return (
        <div className={`${themeBackground} w-full p-4 rounded-lg shadow m-1 hover:ring-2 hover:ring-[#25fc98] `}>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        {post.profile_picture ? <img src={post.profile_picture} alt={post.user_name} className="w-10 h-10 rounded-full" /> : <img src={DEFAULT_IMG} alt={post.user_name} className="w-10 h-10 rounded-full" />}
                    </div>
                </div>
                <div className="flex-grow">
                    <div className={`font-bold ${textColor}`}>{post.user_name}</div>
                    <div className={`${textColor}`}>{post.content}</div>
                    <div className="text-gray-500 text-sm">{formattedDate}</div>
                </div>
            </div>
            {logged_id === post.id_user ?
                <div>
                    <button onClick={handleEdit}>
                        <BsPencilSquare />
                    </button>
                    <button onClick={handleDelete}>
                        <GoTrash />
                    </button>
                </div> : null
            }
            {showModalWindow && (
                <EditAndDeleteModal
                    isEdit={isEdit}
                    onClose={closeModal}
                    id_posts={post.id_posts}
                />
            )}
        </div>

    );
}
NewPost.propTypes = {
    post: PropTypes.object.isRequired,
};

export default NewPost;