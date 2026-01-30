import Product from "../models/Product.js";
import Category from "../models/Category.js";
import { productNameValidation, productSkuValidation } from "../helpers/productValidation.js";
import { formatName } from "../helpers/formatting.js";
import Movement from "../models/Movement.js";

export const createProduct = async (requisition, reply, sessionUserId) => {

    // pega os dados que vem do form 
    const { name, sku, price, quantity, categoryId, description } = requisition.body;

    // pega o id do usuário
    const userId = sessionUserId;

    // passa os dados que vem do body como string para Number
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);
    const parsedCategoryId = Number(categoryId);

    // faz a validação do nome
    const productNameErro = productNameValidation(name);

    if (productNameErro) {
        requisition.flash('message', productNameErro)
        return reply.render('products/add')
    }

    // tratamento do nome do produto
    const finalProductName = formatName(name)


    // valida o sku 
    console.log(sku)
    const skuError = productSkuValidation(sku)
    if (skuError) {
        requisition.flash('message', skuError)
        return reply.render('products/add')
    }

    // validação se os dados realmente são números
    if (Number.isNaN(parsedPrice)) {
        requisition.flash('message', 'O preço precisa ser um número (ex: 100.25)');
        return reply.render('products/add')
    }

    if (Number.isNaN(parsedQuantity)) {
        requisition.flash('message', 'A quantidade precisa ser um número (ex: 10)');
        return reply.render('products/add');
    }

    if (Number.isNaN(parsedCategoryId)) {
        requisition.flash('message', 'A categoria precisa ser um número')
        return reply.render('products/add')
    }

    // verifica se os valores são abaixo de zero
    if (parsedPrice <= 0) {
        requisition.flash('message', 'O valor não pode ser igual ou menor que zero')
        return reply.render('products/add')
    }

    if (parsedQuantity < 0) {
        requisition.flash('message', 'A quantidade não pode ser menor que zero')
        return reply.render('products/add')
    }


    // verifica se a categoria é válida
    const categoryData = await Category.findOne({ where: { id: parsedCategoryId } });


    if (!categoryData) {
        requisition.flash('message', 'Categoria inválida')
        return reply.render('products/add')
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

    requisition.flash('message', 'O produto foi cadastrado com sucesso!');
    requisition.session.save(() => {
        return reply.redirect('/products/dashboard')
    })
}

export const deleteProduct = async (productData) => {

    const productId = productData.body.id;

    const userId = productData.session.userid;

    const destroyedProduct = await Product.destroy({ where: { id: productId } });

    return destroyedProduct

}

export const showProducts = async (req, res) => {

    const datas = await Product.findAll({ include: Category });

    const products = datas.map((result => result.get({ plain: true })))

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
        } else if (product.CategoryId) {
            cleanCategory += 1;
        } else {
            officeCategory += 1;
        }
    });

    res.render('products/dashboard', { products, productsQuantity, eletronicCategory, cleanCategory, officeCategory })
}

export const showEletronics = async (req, res) => {
    const eletronics = await Product.findAll({ raw: true, where: { CategoryId: 1 } });

    let eletronicsQuantity = eletronics.length;

    if (eletronicsQuantity === 0) {
        eletronicsQuantity = false
    }

    res.render('products/eletronics', { eletronicsQuantity, eletronics })
}