import { validateName, validatePassword } from '../../src/helpers/validation.js';

describe('validation.js', () => {
    test('deve barrar nome vazio', () => {
        const name = '';
        expect(validateName(name)).toBe('O nome é obrigatório')
    })

    test('deve barrar nome com length menor que 3', () => {
        const name = 'as';
        expect(validateName(name)).toBe('O nome precisa ter 3 letras ou mais')
    })

    test('deve barrar nome com simbolos', () => {
        const name = 'Nathan@# #';
        expect(validateName(name)).toBe('O nome não deve conter números ou símbolos.')
    })

    test('deve barrar senhas vazias', () => {
        const password = '';
        const confirmPassword = '';
        expect(validatePassword(password, confirmPassword)).toBe('As senhas não podem ser vazias')
    })

    test('deve barrar senhas que nao conhecidem', () => {
        const password = '12345678';
        const confirmPassword = '87654321';
        expect(validatePassword(password, confirmPassword)).toBe('As senhas não conhecidem')
    })

    test('deve barrar senhas menores que 8 caracteres, sem letras maiuscula ou minuscula e sem caracter especial', () => {
        const password = 'nathan@12';
        const confirmPassword = 'nathan@12';
        expect(validatePassword(password, confirmPassword)).toBe('A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e símbolos.')
    })

})
