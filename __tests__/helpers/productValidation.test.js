import { productNameValidation } from '../../src/helpers/productValidation.js';
import { formatName } from '../../src/helpers/formatting.js';
describe('ProductValidation.js', () => {
    test('deve retornar o nome validado', () => {
        const name = 5555555;
        expect(productNameValidation(name)).toBe('O nome do produto deve conter pelo menos uma letra');
    })
})