import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";

const router = Router()

router.post('/registro', registerUser)

router.post('/login', loginUser)

export default router