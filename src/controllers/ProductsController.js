import Product from "../models/Product.js"
import Category from "../models/Category.js"
import { createProduct } from '../services/ProductService.js'

import { formattedProductName, productNameValidation } from "../helpers/productValidation.js"

export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    try {
        await createProduct(req.body);

        req.flash('message', 'O produto foi cadastrado com sucesso!');
        req.session.save(() => {
            return res.redirect('/products/dashboard')
        })
    } catch (error) {
        console.log(`Erro ao salvar o produto: ${error}`)
        return res.render('products/add')
    }
}

export const showDashboard = (req, res) => {
    res.render('products/dashboard')
}