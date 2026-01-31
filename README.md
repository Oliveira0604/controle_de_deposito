# Controle de Depósito 📦

O Controle de Depósito é uma solução robusta para o gerenciamento de inventário, com foco em rastreabilidade e integridade dos dados.
O sistema gerencia todo o fluxo de entrada e saída de produtos, aplicando validações automáticas para evitar dados inconsistentes e garantir o correto registro das movimentações.

## 🚀 Funcionalidades Principais
Cadastro Estruturado: Registro de produtos com validação de SKU único, categorias dinâmicas e tratamento de strings (formatação automática).

Busca Otimizada: Sistema de pesquisa em tempo real (utilizando operadores SQL LIKE) que permite filtrar itens por nome dentro de categorias específicas.

Rastreabilidade (Logs): Cada alteração no estoque gera automaticamente um registro na tabela de Movements, vinculando a ação ao usuário logado.

Regras de Negócio Blindadas: Camada de serviço (Service Layer) independente, garantindo que nenhum dado inconsistente (como preços negativos ou SKUs inválidos) chegue ao banco de dados.


## 🚀 Tecnologias
- Node.js
- Express
- Sequelize (MySQL)
- Handlebars

## 🛠️ Como rodar o projeto
1. Clone o repositório
2. Rode `npm install`
3. Configure o arquivo `.env`
4. Rode `npm start`