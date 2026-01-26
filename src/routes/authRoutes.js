import express from 'express';
const router = express.Router()

import { loginPage, registerPage, registerSave, loginPost } from '../controllers/AuthController.js'

router.get('/login', loginPage)
router.post('/login', loginPost)
router.get('/register', registerPage)
router.post('/register', registerSave)

export default router