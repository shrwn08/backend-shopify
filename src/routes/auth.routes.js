import express from 'express';
import {registerUser, loginUser, updateAddress} from "../controllers/auth.controllers.js";



const router = express.Router();


//Posting /auth/register
router.post('/register', registerUser)
//Posting /auth/login
router.post('/login', loginUser);
router.put('/update-address', updateAddress);

export default router;