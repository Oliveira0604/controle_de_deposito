import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { productNameValidation } from "../helpers/productValidation.js";
import { formatName } from "../helpers/formatting.js";
import Movement from "../models/Movement.js";

export const createProduct = async (bodyData, sessionData) => {

    // pega os dados que vem do form 
    const { name, sku, price, quantity, categoryId, description } = bodyData;

    // pega o id do usuário
    const userId = sessionData;

    // passa os dados que vem do body como string para Number
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);
    const parsedCategoryId = Number(categoryId);

    // faz a validação do nome
    const productNameErro = productNameValidation(name);

    if (productNameErro) {
        req.flash('message', productNameErro)
        return res.render('products/add')
    }

    // tratamento do nome do produto
    const finalProductName = formatName(name)


    if (sku.length != 7) {
        req.flash('message', 'O código precisa ter 7 caracteres');
        return res.render('products/add');
    }

    // validação se os dados realmente são números
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
    const categoryData = await Category.findOne({ where: { id: parsedCategoryId } });


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

    const createdProduct = await Product.create(product);
    await Movement.create({
        type: 'in',
        quantity: parsedQuantity,
        description: 'produto cadastrado',
        ProductId: createdProduct.id,
        UserId: userId
    })
}