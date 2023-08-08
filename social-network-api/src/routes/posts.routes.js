import { Router } from "express";
import { getPost, createPost, getPosts, deletePost, updatePost} from '../controllers/posts.controller.js'
const router = Router()

router.get('/posts', getPosts)

router.get('/posts/:id', getPost)

router.post('/posts', createPost)

router.delete('/posts/:id', deletePost)

router.patch('/posts/:id', updatePost)



export default router