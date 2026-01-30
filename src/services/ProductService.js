import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { productNameValidation, productSkuValidation } from "../helpers/productValidation.js";
import { formatName } from "../helpers/formatting.js";
import Movement from "../models/Movement.js";

export const createProduct = async (requisition) => {

    // pega os dados que vem do form 
    const { name, sku, price, quantity, categoryId, description } = requisition.body;

    // pega o id do usuário
    const userId = requisition.session.userid;

    // passa os dados que vem do body como string para Number
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);
    const parsedCategoryId = Number(categoryId);

    // faz a validação do nome
    const productNameErro = productNameValidation(name);

    if (productNameErro) {
        throw new Error(productNameErro)
    }

    // tratamento do nome do produto
    const finalProductName = formatName(name)


    // valida o sku 
    const skuError = productSkuValidation(sku)
    if (skuError) {
        throw new Error(skuError)
    }

    // validação se os dados realmente são números
    if (Number.isNaN(parsedPrice)) {
        throw new Error('O preço precisa ser um número (ex: 100.25)')
    }

    if (Number.isNaN(parsedQuantity)) {
        throw new Error('A quantidade precisa ser um número (ex: 10)')
    }

    if (Number.isNaN(parsedCategoryId)) {
        throw new Error('A categoria precisa ser um número')
    }

    // verifica se os valores são abaixo de zero
    if (parsedPrice <= 0) {
        throw new Error('O valor não pode ser igual ou menor que zero')
    }

    if (parsedQuantity < 0) {
        throw new Error('A quantidade não pode ser menor que zero')
    }


    // verifica se a categoria é válida
    const categoryData = await Category.findOne({ where: { id: parsedCategoryId } });


    if (!categoryData) {
        throw new Error('Categoria inválida')
    }

    const product = {
        name: finalProductName,
        description: description,
        sku: sku.toUpperCase(),
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

export const deleteProduct = async (productData) => {

    const productId = productData.body.id;

    const userId = productData.session.userid;

    const destroyedProduct = await Product.destroy({ where: { id: productId } });

    return destroyedProduct

}

export const showProducts = async () => {

    const datas = await Product.findAll({ include: Category });

    const products = datas.map((result => result.get({ plain: true })))
    return products
}

export const getCleaningProducts = async (categoryId) => {
    return await Product.findAll({ raw: true, where: { CategoryId: categoryId } });
}

export const getEletronicsProducts = async (categoryId) => {
    return await Product.findAll({ raw: true, where: { CategoryId: categoryId } });

}

export const getOfficeProducts = async (categoryId) => {
    return await Product.findAll({raw: true, where: {CategoryId: categoryId}})
    
}

export const editProductPage = async (productId) => {
    return await Product.findOne({raw: true, where: {id: productId}})
}

export const updateProduct = async (productDatas, productId) => {
    await Product.update(productDatas, {where: {id: productId}})
    
}