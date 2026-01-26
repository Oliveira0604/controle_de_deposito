import express from 'express';
const router = express.Router()

import { loginPage, registerPage } from '../controllers/AuthController.js'

router.get('/login', loginPage)
router.get('/register', registerPage)


export default router