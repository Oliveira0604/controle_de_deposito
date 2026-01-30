import { createProduct, deleteProduct, showProducts, getEletronicsProducts, getCleaningProducts } from '../services/ProductService.js'


export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    try {
        await createProduct(req, res);
        req.flash('message', 'O produto foi cadastrado com sucesso!');

        req.session.save(() => {
            return res.redirect('/products/dashboard')
        })
    } catch (error) {
        console.log(`Erro ao salvar o produto: ${error.message}`)

        req.flash('message', error.message)
        return res.render('products/add')
    }
}

export const showDashboard = async (req, res) => {
    showProducts(req, res)

}

export const showCleaningPage = async (req, res) => {
    try {
        const cleaningProducts = await getCleaningProducts(2)
        console.log(cleaningProducts)

        let cleaningQuantity = cleaningProducts.length;

        if (cleaningQuantity === 0) {
            cleaningQuantity = false
        }

        res.render('products/cleaning', { cleaningProducts, cleaningQuantity })
    } catch (error) {
        console.log(error)

        req.flash('message', 'Erro ao mostrar os produtos')
        res.redirect('/products/dashboard')
    }
}

export const showEletronicsPage = async (req, res) => {
    const eletronicsProducts = await getEletronicsProducts(1);
    let eletronicsQuantity = eletronicsProducts.length;

    if (eletronicsQuantity === 0) {
        eletronicsQuantity = false
    }

    res.render('products/eletronics', { eletronicsQuantity, eletronicsProducts })
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