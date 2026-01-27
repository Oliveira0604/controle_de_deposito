import { formatName } from '../../src/helpers/formatting.js'

describe('formatting.js', () => {
    test('deve formatar o nome', () => {
        const name = 'nathan de oliveira'
        expect(formatName(name)).toBe('Nathan De Oliveira')
    })
})
