import { Router } from "express";
import { getUser, getUsers, loginUser, registerUser, updateProfilePic } from "../controllers/users.controller.js";

const router = Router()

router.post('/registro', registerUser)

router.post('/login', loginUser)

router.get('/users', getUsers)

router.get('/user/:id', getUser)

router.patch('/user/:id', updateProfilePic)

export default router