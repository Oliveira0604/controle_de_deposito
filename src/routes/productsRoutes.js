import express from 'express';
import { addPage, addSave, showDashboard, showCleaningPage, showEletronicsPage, showOfficePage, deletedProduct } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.post('/add', addSave)
router.get('/dashboard', showDashboard)
router.get('/cleaning', showCleaningPage)
router.get('/eletronics', showEletronicsPage)
router.get('/office', showOfficePage)
router.post('/delete', deletedProduct)
export default router;