# Authentication API

Este projeto é uma API RESTful para autenticação, desenvolvida para aprimorar meus conhecimentos e enriquecer meu portfólio. A seguir estão os detalhes das tecnologias utilizadas e as funcionalidades implementadas.

## Tecnologias Utilizadas

### Backend

- **.NET 8.0**: Plataforma para desenvolvimento da API. Inclui endpoints para:
  - `Signin`: Autenticação de usuários.
  - `RefreshToken`: Renovação de tokens de acesso.
  - `Signup`: Registro de novos usuários.
  - `Revoke`: Revogação de tokens.
  - `GetUsers`: Obtenção de informações dos usuários.
  
- **Entity Framework Core**: Utilizado para persistência de dados no banco de dados.

- **Criptografia de Senhas**: Implementada para garantir a segurança das credenciais dos usuários.

### Frontend

- **React**: Biblioteca para construção da interface do usuário.
- **Vite**: Ferramenta para bundling e desenvolvimento rápido.

### Banco de Dados

- **SQL Server**: Gerencia a tabela `Users`, responsável pelo controle dos dados de acesso.

### Arquitetura

- **DTO (Data Transfer Objects)**: Utilizado para a troca de dados entre a API e o cliente.
- **Modelo Controller, Services e Repositories**: Segue o padrão de arquitetura para separar responsabilidades e melhorar a organização do código.

## Funcionalidades

- **Autenticação e Autorização**: Protege endpoints e garante acesso seguro através de tokens JWT.
- **Persistência de Dados**: Gerencia usuários e suas credenciais no banco de dados SQL Server.
- **Interação Frontend e Backend**: Frontend React interage com a API desenvolvida em .NET 8.0.

## Como Rodar o Projeto

1. **Clonar o Repositório:**
   git clone https://github.com/leosilvajr/RestWithASP-NET.git

