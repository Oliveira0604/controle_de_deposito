import express from 'express';
import { addPage, addSave, showDashboard, showCleaningPage, showEletronicsPage, showOfficePage, deletedProduct, editProduct, update } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/add', addPage)
router.post('/add', addSave)
router.get('/dashboard', showDashboard)
router.get('/cleaning', showCleaningPage)
router.get('/eletronics', showEletronicsPage)
router.get('/edit/:id', editProduct)
router.post('/update', update)
router.get('/office', showOfficePage)
router.post('/delete', deletedProduct)
export default router;