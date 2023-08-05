import { useEffect, useState } from 'react';
import PostForm from '../postForm/PostForm';
import NewPost from '../newPost/NewPost';
import axios from 'axios';

const Container = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3000/api/posts');
          setPosts(response.data);
        } catch (error) {
          console.error('Error al obtener los posteos:', error);
        }
      }
  
      fetchPosts();
    }, []);
  
    const handleSubmit = (newPost) => {
      //TODO
    };
  
    return (
      <div className="container mx-auto mt-12 p-4 sm:w-4/5 lg:w-3/5 ">
        <PostForm onSubmit={handleSubmit} />
        <div className="mt-4">
          {posts.map((post, index) => (
            <NewPost key={index} post={post} />
          ))}
        </div>
      </div>
    );
};

export default Container;

