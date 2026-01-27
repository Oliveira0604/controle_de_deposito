import { productNameValidation } from '../../src/helpers/productValidation.js';

describe('ProductValidation.js', () => {
    test('deve barrar nome vazio', () => {
        const name = '';
        expect(productNameValidation(name)).toBe('O nome do produto não pode ser vazio');
    })

    test('deve barrar nome sem letra', () => {
        const name = '55555';
        expect(productNameValidation(name)).toBe('O nome do produto deve conter pelo menos uma letra');
    })

    test('deve barrar simbolos no nome', () => {
        const name = 'Tv @#$';
        expect(productNameValidation(name)).toBe('O nome do produto não deve conter símbolos.');
    })
})