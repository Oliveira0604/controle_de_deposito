import express from 'express';
import { addPage, showDashboard } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.get('/dashboard', showDashboard)

export default router;