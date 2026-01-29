import { createProduct, showProducts, showEletronics } from '../services/ProductService.js'


export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    try {
        await createProduct(req, res, req.session.userid);

        req.flash('message', 'O produto foi cadastrado com sucesso!');
        req.session.save(() => {
            return res.redirect('/products/dashboard')
        })
    } catch (error) {
        console.log(`Erro ao salvar o produto: ${error}`)
        req.flash('message', 'Erro ao cadastrar o produto')
        return res.render('products/add')
    }
}

export const showDashboard = async (req, res) => {
    showProducts(req, res)
    
}

export const showEletronicsPage = async (req, res) => {
    showEletronics(req, res)
}