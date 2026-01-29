import express from 'express';
import { addPage, addSave, showDashboard, showEletronicsPage } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.post('/add', addSave)
router.get('/dashboard', showDashboard)
router.get('/eletronics', showEletronicsPage)
export default router;