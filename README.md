# Controle de Depósito 📦

O Controle de Depósito é uma solução robusta para o gerenciamento de inventário, com foco em rastreabilidade e integridade dos dados.
Ele gerencia o fluxo de entrada e saída de produtos com validações automáticas, garantindo dados consistentes e o correto registro das movimentações. O projeto foi desenvolvido com Express, JavaScript e MySQL.

## 🚀 Funcionalidades Principais
**Cadastro Estruturado**: Registro de produtos com validação de SKU único, categorias dinâmicas e tratamento de strings (formatação automática).

**Busca Otimizada**: Sistema de pesquisa em tempo real (utilizando operadores SQL LIKE) que permite filtrar itens por nome dentro de categorias específicas.

**Rastreabilidade (Logs)**: Cada alteração no estoque gera automaticamente um registro na tabela de Movements, vinculando a ação ao usuário logado.

**Regras de Negócio Blindadas**: Camada de serviço (Service Layer) independente, garantindo que nenhum dado inconsistente (como preços negativos ou SKUs inválidos) chegue ao banco de dados.


## 🚀 Tecnologias utilizadas
- Node.js
- Express
- Sequelize (MySQL)
- Handlebars (Templates)
- CSS

## 🛠️ Como rodar o projeto
1. **Clone o repositório**: `git clone https://github.com/Oliveira0604/controle_de_deposito`
2. **Instale as dependências**: `npm install`
3. **Configure as variáveis de ambiente**: Crie um arquivo .env na raiz do projeto baseado no arquivo .env.example
    > **Importante**: Você deve criar o banco de dados manualmente no seu MySQL antes de iniciar o servidor, para que o Sequelize consiga sincronizar as tabelas.
4. **Configure o arquivo** : `.env`
5. **Inicie o servidor**: `npm start` (O servidor utilizará o nodemon para observar mudanças em src/index.js). Acesse: `http://localhost:3000`.
6. **Executando os Testes**: Para rodar a suíte de testes com Jest e suporte a ES6 Modules, utilize: npm test Este comando executa o script configurado para lidar com --experimental-vm-modules.

## 📖 Instruções de Uso
Após iniciar o servidor e acessar http://localhost:3000, siga os passos abaixo para explorar as funcionalidades do sistema:

1. Autenticação
Realize o cadastro de um novo usuário ou utilize uma conta existente para acessar o painel administrativo.

O sistema utiliza sessões para garantir que apenas usuários logados possam gerenciar o estoque.

2. Gestão de Produtos
Cadastrar: Vá até a seção "Novo Produto", preencha o nome, quantidade inicial e categoria. Ao salvar, o sistema criará automaticamente um registro de movimentação do tipo in.

Editar: Na listagem de produtos, clique em "Editar" para atualizar informações. Alterações de estoque geram um log automático com o tipo updated.

Excluir: O sistema utiliza Soft Delete. Ao excluir um produto, ele ficará invisível na listagem, mas seu histórico permanecerá no banco de dados.

3. Sistema de Pesquisa
Utilize a barra de busca no topo das categorias para filtrar produtos por nome.

Busca Dinâmica: A pesquisa funciona em tempo real. Se você apagar o termo de busca, a listagem completa da categoria será recarregada automaticamente.

4. Histórico de Movimentações
Toda ação (entrada, saída, edição, exclusão) pode ser conferida no banco de dados na tabela Movements, permitindo auditoria completa de quem alterou o quê e quando.