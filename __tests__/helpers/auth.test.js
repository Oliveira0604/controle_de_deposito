import { checkAuth } from "../../src/helpers/auth.js";
import { jest } from '@jest/globals';

describe('auth.js', () => {
    test('deve redirecionar se não existir usuário na sessão', () => {
        const req = {
            session: {}
        };
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();

        checkAuth(req, res, next)

        expect(res.redirect).toHaveBeenCalledWith('/auth/login')
    })

     test('deve executar next se existir id na session', () => {
        const req = {
            session: {
                userid: 1
            }
        };
        const res = {
            redirect: jest.fn()
        };
        const next = jest.fn();

        checkAuth(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
    })
})