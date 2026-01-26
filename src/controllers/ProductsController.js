import { createProduct } from '../services/ProductService.js'


export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    try {
        await createProduct(req.body, req.session.userid);

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

export const showDashboard = (req, res) => {
    res.render('products/dashboard')
}