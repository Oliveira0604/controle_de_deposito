import express from 'express';
import { showDashboard } from '../controllers/ProductsController.js'
const router = express.Router();

router.get('/dashboard', showDashboard)

export default router;