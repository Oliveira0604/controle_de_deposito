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

## 🧪 Testes Automatizados

O projeto possui testes automatizados desenvolvidos com **Jest**, com foco principal nas **regras de negócio da camada de serviço** e nos **helpers utilitários**, garantindo consistência e previsibilidade do sistema.

Os testes cobrem:
- Criação e atualização de produtos
- Registro correto das movimentações na tabela **Movements**
- Validação de cenários de sucesso e falha
- Garantia de integridade dos dados em operações críticas
- Testes unitários de **helpers**, assegurando o correto tratamento e padronização dos dados
- Isolamento das dependências do banco de dados por meio de **mocks dos models do Sequelize**

A suíte de testes foi configurada para funcionar com **ES Modules**, utilizando o Jest em conjunto com a flag `--experimental-vm-modules`, permitindo uma estrutura moderna e alinhada às boas práticas do ecossistema Node.js.


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
<img width="1918" height="908" alt="Captura de tela 2026-01-31 152020" src="https://github.com/user-attachments/assets/d53f7a41-2f06-4ffb-9c02-c337e37f31a6" />


Após o cadastrado da conta é redirecionado para a página de login
<img width="1919" height="909" alt="Captura de tela 2026-01-31 153432" src="https://github.com/user-attachments/assets/0dfb8523-bf8c-4e30-b0ea-5cc80b3a0b5a" />


O sistema utiliza sessões para garantir que apenas usuários logados possam gerenciar o estoque.


2. Gestão de Produtos
Cadastrar: Vá até a seção "Novo Produto", preencha o nome, quantidade inicial e categoria. Ao salvar, o sistema criará automaticamente um registro de movimentação do tipo in.
<img width="1900" height="897" alt="Captura de tela 2026-01-31 153604" src="https://github.com/user-attachments/assets/4b1c2773-b9e3-4fcd-ad9c-34685b11efee" />
<img width="1897" height="909" alt="Captura de tela 2026-01-31 154122" src="https://github.com/user-attachments/assets/d1d3bbe1-b97b-43e8-917d-c3b29832c62f" />


Editar: Na listagem de produtos, clique em "Editar" para atualizar informações. Alterações de estoque geram um log automático com o tipo updated.

<img width="343" height="280" alt="Captura de tela 2026-01-31 154233" src="https://github.com/user-attachments/assets/9a74d8d0-cc4a-40ac-9e14-0e7fe914a83d" />

E é redirecionado a uma página que mostra as informações do produto, facilitando a edição
<img width="1895" height="904" alt="Captura de tela 2026-01-31 154459" src="https://github.com/user-attachments/assets/ef6fbe64-5b9b-4547-a657-37c0dc466024" />


Excluir: O sistema utiliza Soft Delete. Ao excluir um produto, ele ficará invisível na listagem, mas seu histórico permanecerá no banco de dados.
<img width="1919" height="911" alt="Captura de tela 2026-01-31 154631" src="https://github.com/user-attachments/assets/1cfc024b-f222-449c-9b83-7cbd8c7799f3" />
<img width="1919" height="907" alt="Captura de tela 2026-01-31 154811" src="https://github.com/user-attachments/assets/d0a810cd-2b45-4fdb-852b-188e2a67b29b" />
<img width="1215" height="273" alt="Captura de tela 2026-01-31 155000" src="https://github.com/user-attachments/assets/532124ae-b8a2-4df9-be1d-468ea47287b8" />



3. Sistema de Pesquisa
Utilize a barra de busca no topo das categorias para filtrar produtos por nome.
<img width="1919" height="910" alt="Captura de tela 2026-02-01 122020" src="https://github.com/user-attachments/assets/b56db2db-2037-4c81-a688-ec3311503b1b" />
<img width="1911" height="960" alt="Captura de tela 2026-02-01 123143" src="https://github.com/user-attachments/assets/0ce151ed-e85f-49ed-8059-bc49a61e1fa7" />



4. Histórico de Movimentações
Toda ação (entrada, saída, edição, exclusão) pode ser conferida no banco de dados na tabela Movements, permitindo auditoria completa de quem alterou o quê e quando.
<img width="1289" height="346" alt="Captura de tela 2026-02-01 123223" src="https://github.com/user-attachments/assets/452f19a9-9cff-4165-9af2-edb4cd8a2c70" />
