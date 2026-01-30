import express from 'express';
import { addPage, addSave, showDashboard, showEletronicsPage, deletedProduct } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.post('/add', addSave)
router.get('/dashboard', showDashboard)
router.get('/eletronics', showEletronicsPage)
router.post('/delete', deletedProduct)
export default router;