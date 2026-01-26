import express from 'express';
const router = express.Router()

import { loginPage, registerPage, registerSave } from '../controllers/AuthController.js'

router.get('/login', loginPage)
router.get('/register', registerPage)
router.post('/register', registerSave)

export default router