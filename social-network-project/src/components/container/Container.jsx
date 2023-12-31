import { useEffect, useState, useContext } from 'react';
import PostForm from '../postForm/PostForm';
import NewPost from '../newPost/NewPost';
import axios from 'axios';
import { Context } from '../../context/Context';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import Restricted from '../../pages/restricted/Restricted';

const Container = () => {
    const [posts, setPosts] = useState([]);
    const context = useContext(Context);
    const [urlLocation, setUrlLocation] = useState(useLocation().pathname)
    const [styleContainer, setStyleContainer] = useState("")

    const themeBackground = context.clearTheme ? "bg-black-50" : "bg-[#444444]";
   

    const { isLoggedIn } = useAuthStore()
  
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

    useEffect(()=>{
     if(urlLocation == "/home"){setStyleContainer(" w-5/6 m-auto pt-7 lg:w-1/2 ")}
     else{setStyleContainer("w-2/3 ml-8 lg:m-auto lg:w-full lg:ml-10")}
    },[])

    if(!isLoggedIn){
      return <Restricted/>
    }
  
    return (
      <div className={`${themeBackground} mt-14 md:ml-16`}>
        <div className={`${styleContainer} `}>
        <PostForm />
        <div className="mt-4">
          {posts.map((post) => (
            <NewPost key={post.id_posts} post={post} />
          ))}
        </div>
        </div>
      </div>
    );
};

export default Container;

