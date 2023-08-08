import { useEffect, useState, useContext } from 'react';
import PostForm from '../postForm/PostForm';
import NewPost from '../newPost/NewPost';
import axios from 'axios';
import { Context } from '../../context/Context';
// import { useTranslate } from '../../hooks/useTranslate';
// import { Translations } from '../../translations/translations';

const Container = () => {
    const [posts, setPosts] = useState([]);
    const context = useContext(Context);
    // const translations = useTranslate(Translations(context));
    const themeBackground = context.clearTheme ? "bg-black-100" : "bg-[#333333]";
    // const textColor = context.clearTheme ? "600" : "100"
    // const navbarHoverButtonBackground = context.clearTheme ? "hover:bg-[#ffffff]" : "hover:bg-gray-300 hover:text-black-600" ;


    
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3000/api/posts');

          const sortedPosts = response.data.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
          setPosts(sortedPosts);
        } catch (error) {
          console.error('Error al obtener los posteos:', error);
        }
      }
  
      fetchPosts();
    }, [posts]);
  
    return (
      <div className={`${themeBackground} container mx-auto mt-12 p-4 sm:w-4/5 lg:w-3/5`}>
        <PostForm />
        <div className="mt-4">
          {posts.map((post) => (
            <NewPost key={post.id_posts} post={post} />
          ))}
        </div>
      </div>
    );
};

export default Container;

