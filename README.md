# Controle de Depósito 📦

O Controle de Depósito é uma solução robusta para o gerenciamento de inventário, com foco em rastreabilidade e integridade dos dados.
O sistema gerencia o fluxo de entrada e saída de produtos com validações automáticas, garantindo dados consistentes e o correto registro das movimentações. O projeto foi desenvolvido com Express, JavaScript e MySQL.

## 🚀 Funcionalidades Principais
Cadastro Estruturado: Registro de produtos com validação de SKU único, categorias dinâmicas e tratamento de strings (formatação automática).

Busca Otimizada: Sistema de pesquisa em tempo real (utilizando operadores SQL LIKE) que permite filtrar itens por nome dentro de categorias específicas.

Rastreabilidade (Logs): Cada alteração no estoque gera automaticamente um registro na tabela de Movements, vinculando a ação ao usuário logado.

Regras de Negócio Blindadas: Camada de serviço (Service Layer) independente, garantindo que nenhum dado inconsistente (como preços negativos ou SKUs inválidos) chegue ao banco de dados.


## 🚀 Tecnologias utilizadas
- Node.js
- Express
- Sequelize (MySQL)
- Handlebars
- CSS

## 🛠️ Como rodar o projeto
1. **Clone o repositório**: `git clone https://github.com/Oliveira0604/controle_de_deposito`
2. **Instale as dependências**: `npm install`
3. **Configure as variáveis de ambiente**: Crie um arquivo .env na raiz do projeto baseado no arquivo .env.example
    > **Importante**: Você deve criar o banco de dados manualmente no seu MySQL antes de iniciar o servidor, para que o Sequelize consiga sincronizar as tabelas.
4. **Configure o arquivo** : `.env`
5. **Inicie o servidor**: `npm start` (O servidor utilizará o nodemon para observar mudanças em src/index.js). Acesse: `http://localhost:3000`.
6. **Executando os Testes**: Para rodar a suíte de testes com Jest e suporte a ES6 Modules, utilize: npm test Este comando executa o script configurado para lidar com --experimental-vm-modules.