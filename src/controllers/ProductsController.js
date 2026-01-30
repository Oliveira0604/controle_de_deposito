import { createProduct, deleteProduct, showProducts, getEletronicsProducts, getCleaningProducts, getOfficeProducts, editProductPage, updateProduct } from '../services/ProductService.js'


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
    const products = await showProducts()

    let productsQuantity = products.length;

    if (productsQuantity === 0) {
        productsQuantity = false;
    }

    let eletronicCategory = 0;
    let cleanCategory = 0;
    let officeCategory = 0;
    products.forEach(product => {
        if (product.CategoryId === 1) {
            eletronicCategory += 1;
        } else if (product.CategoryId === 2) {
            cleanCategory += 1;
        } else {
            officeCategory += 1;
        }
    });

    res.render('products/dashboard', { products, productsQuantity, eletronicCategory, cleanCategory, officeCategory })

}

export const showCleaningPage = async (req, res) => {
    try {
        const cleaningProducts = await getCleaningProducts(2)

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

export const showOfficePage = async (req, res) => {
    try {
        const officeProducts = await getOfficeProducts(3);

        let officeQuantity = officeProducts.length

        if (officeQuantity === 0) {
            officeQuantity = false
        }

        res.render('products/office', { officeProducts, officeQuantity })
    } catch (error) {
        req.flash('message', 'Erro ao acessar a página de produtos de escritório.')
        res.redirect('/products/office')
    }

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

export const editProduct = async (req, res) => {
    const productId = req.params.id;

    const product = await editProductPage(productId)

    res.render('products/edit', { product })
}

export const update = async (req, res) => {
    try {
        const productId = req.body.id

        const name = req.body.name
        const sku = req.body.sku
        const price = req.body.price
        const quantity = req.body.quantity
        const categoryId = req.body.categoryId
        const description = req.body.description

        const productDatas = {
            name: name,
            sku: sku,
            price: price,
            quantity: quantity,
            categoryId: categoryId,
            description: description
        }

        await updateProduct(productDatas, productId)

        req.flash('message', 'Produto editado com sucesso')
        req.session.save(() => {
            res.redirect('/products/dashboard')
        })
    } catch (error) {
        console.log(error.message)

        req.flash('message', 'Erro ao editar o produto')
        res.render('products/dashboard')
    }
}