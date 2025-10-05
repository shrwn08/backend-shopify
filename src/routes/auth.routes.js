import express from 'express';
import {registerUser, loginUser} from "../controllers/auth.controllers.js";



const router = express.Router();


//Posting /auth/register
router.post('/register', registerUser)
//Posting /auth/login
router.post('/login', loginUser);

export default router;