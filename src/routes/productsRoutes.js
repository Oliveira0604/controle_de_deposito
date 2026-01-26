import express from 'express';
import { addPage, addSave, showDashboard } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.post('/add', addSave)
router.get('/dashboard', showDashboard)

export default router;