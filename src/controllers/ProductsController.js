import { createProduct, deleteProduct, showProducts, showEletronics } from '../services/ProductService.js'


export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    try {
        await createProduct(req, res, req.session.userid);
      
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

export const deletedProduct = async (req, res) => {
    try {
        deleteProduct(req, res)
        req.flash('message', 'Produto deletado com sucesso')
        req.session.save(() => {
            res.render('products/dashboard')
        })
    } catch (error) {
        req.flash('message', 'Erro ao deletar o produto.', + error)
        res.render('products/dashboard')
    }
    
}