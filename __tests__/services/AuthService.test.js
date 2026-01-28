import { describe, test, expect, jest, beforeEach } from '@jest/globals';

// mock da tabela User
jest.unstable_mockModule('../../src/models/User.js', () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}))

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        genSalt: jest.fn(),
        hash: jest.fn()
    }
}));

const bcrypt = (await import('bcrypt')).default;

const { register } = await import('../../src/services/AuthService.js');
const User = (await import('../../src/models/User.js')).default;

describe('AuthService - register', () => {
    beforeEach(() => {
        jest.resetAllMocks()

    })
    test('deve retornar erro se o nome for inválido', async () => {
        const req = {
            body: {
                name: '',
                email: 'teste@email.com',
                password: 'teste@12',
                confirmPassword: 'teste@12'
            },
            flash: jest.fn()

        }
        const res = {
            render: jest.fn()
        }

        await register(req, res)

        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('auth/register')
    })

    test('deve retornar erro se o email já existir', async () => {
        User.findOne.mockResolvedValue({
            id: 1,
            name: 'Nathan de Oliveira',
            email: 'teste@email.com',
            password: 'Hashed@password'
        })
        const req = {
            body: {
                name: 'Nathan de Oliveira',
                email: 'teste@email.com',
                password: 'Hashed@password',
                confirmPassword: 'Hashed@password'
            },
            flash: jest.fn()

        }
        const res = {
            render: jest.fn()
        }

        await register(req, res)

        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'Esse email já esta cadastrado'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
    })

    test('deve barrar se a senha não seguir os padrões', async () => {
        const req = {
            body: {
                name: 'Nathan de Oliveira',
                email: 'teste@email.com',
                password: '123',
                confirmPassword: '123'
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await register(req, res);

        expect(req.flash).toHaveBeenCalledTimes(1)
        expect(req.flash).toHaveBeenCalledWith(
            'message',
            'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e símbolos.'
        )
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render).toHaveBeenCalledWith('auth/register')
    })

    test('deve criptografar a senha antes de salvar', async () => {
        bcrypt.genSalt.mockResolvedValue('salt_falso')
        bcrypt.hash.mockResolvedValue('Hashed@password')
        const req = {
            body: {
                name: 'Nathan de Oliveira',
                email: 'teste@email.com',
                password: 'Hashed@password',
                confirmPassword: 'Hashed@password'
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        await register(req, res);
        expect(bcrypt.genSalt).toHaveBeenCalledTimes(1)
        expect(bcrypt.genSalt).toHaveBeenCalledWith(10)
        expect(bcrypt.hash).toHaveBeenCalledTimes(1)
        expect(bcrypt.hash).toHaveBeenCalledWith('Hashed@password', 'salt_falso')
    })

    test('deve criar o usuario no DB', async () => {
        bcrypt.hash.mockResolvedValue('Hashed@password');
        const req = {
            body: {
                name: 'Nathan De Oliveira',
                email: 'teste@email.com',
                password: 'Hashed@password',
                confirmPassword: 'Hashed@password'
            },
            flash: jest.fn()
        }
        const res = {
            render: jest.fn()
        }

        const data = {
            name: 'Nathan De Oliveira',
            email: 'teste@email.com',
            password: 'Hashed@password'
        }

        await register(req, res);
        expect(User.create).toHaveBeenCalledTimes(1)
        expect(User.create).toHaveBeenCalledWith(data)
    })
})