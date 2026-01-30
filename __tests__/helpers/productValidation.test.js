const { productNameValidation, productSkuValidation } = await import('../../src/helpers/productValidation.js');

describe('ProductValidation.js', () => {
    test('deve barrar nome vazio', () => {
        const name = '';
        expect(productNameValidation(name)).toBe('O nome do produto não pode ser vazio.');
    })

    test('deve barrar nome sem letra', () => {
        const name = '55555';
        expect(productNameValidation(name)).toBe('O nome do produto deve conter pelo menos uma letra.');
    })

    test('deve barrar simbolos no nome', () => {
        const name = 'Tv @#$';
        expect(productNameValidation(name)).toBe('O nome do produto não deve conter símbolos.');
    })
    
    test('deve barrar sku vazio', () => {
        const sku = ''
        expect(productSkuValidation(sku)).toBe('O código não pode ser vázio.')
    })

    test('deve barrar se a length do sku for diferente de 7', () => {
        const sku = 'aaaaaaaaaaa'
        expect(productSkuValidation(sku)).toBe('O código precisa ter 7 caracteres.')
    })

    test('deve barrar se o codigo não estiver no padrão correto', () => {
        const sku = '-el0001'
        expect(productSkuValidation(sku)).toBe('O código não está no padrão correto.')
    })
})