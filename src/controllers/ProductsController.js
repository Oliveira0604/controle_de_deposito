import Product from "../models/Product.js"
import Category from "../models/Category.js"

import { formattedProductName, productNameValidation } from "../helpers/productValidation.js"

export const addPage = (req, res) => {
    res.render('products/add')
}

export const addSave = async (req, res) => {

    // pega os dados que vem do form 
    const {name, sku, price, quantity, categoryId, description} = req.body;

    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);
    const parsedCategoryId = Number(categoryId)

    // verifica se o nome do produto veio vazio ou com números e simbolos
    const productNameErro = productNameValidation(name);

    // se está fora do padrão, renderiza a página novamente
    if (productNameErro) {
        req.flash('message', productNameErro)
        return res.render('products/add')
    }

    // tratamento do nome do produto
    const finalProductName = formattedProductName(name)
    
    // verifica se o sku tem tamanho máximo de 10 
    if (sku.length != 7) {
        req.flash('message', 'O código precisa ter 7 caracteres');
        return res.render('products/add');
    }

    if (Number.isNaN(parsedPrice)) {
        req.flash('message', 'O preço precisa ser um número (ex: 100.25');
        return res.render('products/add')
    }

    if (Number.isNaN(parsedQuantity)) {
        req.flash('message', 'A quantidade precisa ser um número (ex: 10');
        return res.render('products/add');
    }

    if (Number.isNaN(parsedCategoryId)) {
        req.flash('message', 'A categoria precisa ser um número')
        return res.render('products/add')
    }

    // verifica se os valores são abaixo de zero
    if (parsedPrice <= 0) {
        req.flash('message', 'O valor não pode ser igual ou menor que zero')
        return res.render('products/add')
    }

        if (parsedQuantity < 0) {
        req.flash('message', 'A quantidade não pode ser menor que zero')
        return res.render('products/add')
    }

    // verifica se a categoria é válida
    const categoryData = await Category.findOne({where: {id: parsedCategoryId}});
    

    if (!categoryData) {
        req.flash('message', 'Categoria inválida')
        return res.render('products/add')
    }

    const product = {
        name: finalProductName,
        description: description,
        sku: sku,
        price: parsedPrice,
        quantity: parsedQuantity,
        CategoryId: categoryData.id
    }

    try {
        await Product.create(product);
        req.flash('message', 'O produto foi cadastrado com sucesso!')
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