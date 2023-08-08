import PropTypes from 'prop-types';
import { format, utcToZonedTime } from 'date-fns-tz'
// import { Translations } from '../../translations/translations';
import { useContext } from 'react';
import { Context } from '../../context/Context';
// import { useTranslate } from '../../hooks/useTranslate';

const DEFAULT_IMG = 'https://static.vecteezy.com/system/resources/previews/002/519/144/non_2x/social-media-avatar-free-vector.jpg'

const  NewPost = ({ post }) => {

const utcDateFromApi = new Date(post.publication_date);
const timeZone = 'America/Argentina/Buenos_Aires';
const zonedDate = utcToZonedTime(utcDateFromApi, timeZone);

const context = useContext(Context);
    // const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#444444]";
    const textColor = context.clearTheme ? "600" : "100"
    // const navbarHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;


const formattedDate = format(zonedDate, 'MMMM dd, yyyy HH:mm', { timeZone });

    return (
      <div className={`${themeBackground} p-4 rounded-lg shadow m-1 hover:ring-2 hover:ring-[#25fc98]`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              {post.profile_picture ? <img src={post.profile_picture} alt={post.user_name} className="w-10 h-10 rounded-full" />: <img src={DEFAULT_IMG} alt={post.user_name} className="w-10 h-10 rounded-full" />}     
            </div>
          </div>
          <div className="flex-grow">
            <div className={`font-bold text-black-${textColor}`}>{post.user_name}</div>
            <div className={`text-black-${textColor}`}>{post.content}</div>
            <div className="text-gray-500 text-sm">{formattedDate}</div>
          </div>
        </div>
      </div>
    );
  };
  NewPost.propTypes = {
    post: PropTypes.object.isRequired,
  };
  
export default NewPost;
  