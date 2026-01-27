export default {
    testEnvironment: 'node',
    // O transform diz ao Jest: "use o babel-jest para ler arquivos JS"
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    // Simplificando para ele achar qualquer arquivo .test.js ou .spec.js
    testMatch: ['**/?(*.)+(spec|test).js'],
};