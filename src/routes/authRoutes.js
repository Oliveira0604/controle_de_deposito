import express from 'express';
const router = express.Router()

import { loginPage} from '../controllers/AuthController.js'

router.get('/login', loginPage)



export default router