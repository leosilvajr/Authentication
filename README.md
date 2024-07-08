# Projeto de Autenticação com .NET 8.0

Este repositório contém uma API de autenticação desenvolvida com .NET 8.0, focada em fornecer segurança robusta e desempenho otimizado. O projeto está dividido em quatro soluções para uma arquitetura limpa e escalável.

## Estrutura do Projeto

- **Authentication.API**: Contém a API que expõe os endpoints para autenticação.
- **Authentication.Domain**: Define as entidades e regras de negócio.
- **Authentication.Persistence**: Responsável pelo acesso aos dados e versionamento das migrations.
- **Authentication.Service**: Implementa os serviços e lógica de aplicação.

## Funcionalidades

- **Autenticação e Autorização**: Implementação de autenticação utilizando criptografia de token.
- **Documentação**: Documentação completa dos endpoints utilizando Swagger.
- **Migrations**: Uso do Entity Framework para versionamento e gestão de migrations do banco de dados.
- **DTO**: Uso de Data Transfer Objects (DTOs) para transferência de dados entre camadas.

## Tecnologias Utilizadas

- [.NET 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Entity Framework Core](https://docs.microsoft.com/ef/core/)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Swagger](https://swagger.io/)

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Visual Studio](https://visualstudio.microsoft.com/)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/sql-server)

## Instalação e Execução

Siga os passos abaixo para configurar e executar a aplicação:

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd seu-repositorio
    ```

3. Restaure as dependências e compile a solução:
    ```bash
    dotnet restore
    dotnet build
    ```

4. Aplique as migrations e atualize o banco de dados:
    ```bash
    dotnet ef database update --project Authentication.Persistence
    ```

5. Execute a aplicação:
    ```bash
    dotnet run --project Authentication.API
    ```

6. Acesse a documentação Swagger para explorar os endpoints:
    ```
    http://localhost:5000/swagger
    ```

## Imagens do Projeto

### Documentação Swagger
![Swagger](https://i.ibb.co/3kY0MNJ/Imagem-do-Whats-App-de-2024-07-07-s-23-39-48-0dc6b3b2.jpg)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests. Para grandes mudanças, por favor abra um issue primeiro para discutir o que você gostaria de mudar.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Para qualquer dúvida ou sugestão, entre em contato ou abra uma issue.

