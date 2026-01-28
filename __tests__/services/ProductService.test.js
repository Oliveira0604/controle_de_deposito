import { describe, expect, test, jest } from '@jest/globals';

jest.unstable_mockModule('../../src/models/Product.js', () => ({
    default: {
        create: jest.fn()
    }
}))

jest.unstable_mockModule('../../src/models/Movement.js', () => ({
    default: {
        create: jest.fn()
    }
}));

jest.unstable_mockModule('../../src/models/Category.js', () => ({
    default: {
        findOne: jest.fn()
    }
}))

const Category = (await import('../../src/models/Category.js')).default;
const Product = (await import('../../src/models/Product.js')).default;
const Movement = (await import('../../src/models/Movement.js')).default;

const { createProduct } = await import('../../src/services/ProductService.js')

describe('ProductService.js - createProduct', () => {
    beforeEach(() => {
        jest.clearAllMocks()

    })
    test('deve barrar se o nome nao seguir os padroes', async () => {
        const req = {
            body: {
                name: '',
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message', 'O nome do produto não pode ser vazio.'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se o sku nao for exatamente 7', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL'
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'O código precisa ter 7 caracteres'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se o valor recebido do input preco nao for um numero', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL-0001',
                price: "aaa"
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'O preço precisa ser um número (ex: 100.25)'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se o valor recebido do input quantidade nao for um numero', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL-0001',
                price: 1000,
                quantity: "aaa"
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'A quantidade precisa ser um número (ex: 10)'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se o valor recebido do input quantidade nao for um numero', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL-0001',
                price: 1000,
                quantity: 1,
                categoryId: 'aaa'
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'A categoria precisa ser um número'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se o preco for menor do que zero', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL-0001',
                price: -1,
                quantity: 1,
                categoryId: 1
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'O valor não pode ser igual ou menor que zero'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se a quantidade for menor do que zero', async () => {
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'EL-0001',
                price: 100,
                quantity: -1,
                categoryId: 1
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res);
        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'A quantidade não pode ser menor que zero'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('products/add')
    })

    test('deve barrar se a categoria nao existir', async () => {
        Category.findOne.mockResolvedValue(null)
        const req = {
            body: {
                name: 'Tv Samsumg',
                sku: 'El00001',
                price: 100,
                quantity: 1,
                categoryId: 4
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await createProduct(req, res, 1);

        expect(Category.findOne).toHaveBeenCalledTimes(1)
        expect(Category.findOne).toHaveBeenCalledWith({where: {id: 4}})
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'Categoria inválida'
        )
    })

    test('deve criar o produto', async () => {
        Product.create.mockResolvedValue({
            id: 1
        })
        Category.findOne.mockResolvedValue({
            id: 1
        })
        const req = {
            body: {
                name: 'Tv Samsumg',
                description: 'teste2',
                sku: 'El00001',
                price: 100,
                quantity: 1,
                categoryId: 1
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        const product = {
            name: req.body.name,
            description: req.body.description,
            sku: req.body.sku,
            price: req.body.price,
            quantity: req.body.quantity,
            CategoryId: req.body.categoryId
        }

        const movement = {
            type: 'in',
            quantity: req.body.quantity,
            description: 'produto cadastrado',
            ProductId: 1,
            UserId: 1
        }

        await createProduct(req, res, 1);
        expect(Product.create).toHaveBeenCalledTimes(1)
        expect(Product.create).toHaveBeenCalledWith(product)
        expect(Movement.create).toHaveBeenCalledTimes(1)
        expect(Movement.create).toHaveBeenCalledWith(movement)
    })
})