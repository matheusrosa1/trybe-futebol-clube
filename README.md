# Trybe Futebol Clube

Breve descrição do projeto em uma ou duas frases.

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

Uma visão geral mais detalhada do projeto, explicando o que ele faz, por que é útil, etc.

## Tecnologias Utilizadas

- Docker
- Typescript (POO)
- Sequelize
- mysql2
- Express
- Chai
- Mocha


## Instalação

### Dependências

Para instalar as dependências necessárias, execute o comando `npm install` na pasta raiz do projeto. Cada diretório (frontend e backend) possui suas próprias dependências. É possivel instalá-las de maneira rápida executando `npm run install:apps` na pasta raiz do projeto, ou executando `npm install` dentro de cada diretório separadamente.

### Containers Docker

Para iniciar a aplicação localmente em containers Docker, basta executar o comando `npm run compose:up` na raiz do projeto. Ao instalar o container, se corretamente instalado, os servidores já estarão automaticamente inicializados.

#### Logs do container

- Backend: docker logs -f app_backend

- Frontend: docker logs -f app_frontend


### Acesso ao banco de dados
A senha padrão para acessar o banco de dados SQL do backend está definida na porta definida por padrão `3306` e pode ser encontrada no arquivo `docker-compose.yaml`. Para acessar o frontend, utilize a porta definida por padrão `3000`.


## Como Usar

Explicação sobre como usar o projeto depois de instalado. Inclua exemplos, comandos de linha de entrada, etc.

### Rodando os testes locais

Para execução dos testes (unitários) utilizar o comando `npm run test` dentro da pasta trybe-futebol-clube/app/backend 


## Licença

Declare a licença do projeto. Se você está utilizando uma licença padrão (por exemplo, MIT, Apache), inclua o texto da licença no README. Se estiver utilizando uma licença personalizada, forneça informações sobre ela.

## Contato

Instruções sobre como entrar em contato com os mantenedores do projeto. Isso pode incluir links para o perfil do GitHub, endereço de e-mail, etc.
