import Product from "../models/Product.js"

import { productNameValidation } from "../helpers/productValidation.js"

export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    // pega os dados que vem do form 
    const {name, sku, price, quantity, description} = req.body;

    // verifica se o nome do produto veio vazio ou com números e simbolos
    const productNameErro = productNameValidation(name);

    // se está fora do padrão, renderiza a página novamente
    if (productNameErro) {
        req.flash('message', productNameErro)
        return res.render('products/add')
    }

    // tratamento do nome do produto
    const formattedProductName = name.split(' ').map(name => 
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    ).join(' ');
    
    // verifica se o sku tem tamanho máximo de 10 
    if (sku.length != 10) {
        req.flash('message', 'O código precisa ter 10 caracteres');
        return res.render('products/add');
    }

    if (isNaN(price)) {
        req.flash('message', 'O preço precisa ser um número (ex: 100.25');
        return res.render('products/add')
    }

    if (isNaN(quantity)) {
        req.flash('message', 'A quantidade precisa ser um número (ex: 10');
        return res.render('products/add');
    }


    const product = {
        name: formattedProductName,
        description: description,
        sku: sku,
        price: price,
        quantity: quantity
    }

    try {
        await Product.create(product)
    } catch (error) {
        console.log(error)
    }
}

export const showDashboard = (req, res) => {
    res.render('products/dashboard')
}