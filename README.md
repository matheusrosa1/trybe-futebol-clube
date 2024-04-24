# Trybe Futebol Clube

Projeto realizado para formação em back-end durante o curso da Trybe - Escola de Tecnologia. O aplicativo trata-se de um site informativo sobre partidas e classificações de futebol ⚽️


## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como utilizar](#como-utilizar)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

Uma visão geral mais detalhada do projeto, explicando o que ele faz, por que é útil, etc.

## Tecnologias Utilizadas

- Noje.js (Typescript - POO)
- Sequelize
- Docker
- mysql2
- Express
- JSON Web Token (Jwt)
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

A senha padrão para acessar o banco de dados SQL está definida na porta definida por padrão `3306` e pode ser encontrada no arquivo `docker-compose.yaml`. Para acessar o frontend, utilize a porta definida por padrão `3000`.

## Funcionalidades

- Visualizar a Classificação dos times de acordo com os resultados e suas respectivas estatística dos jogos de cada time.
- Filtrar a classificação:
  - Classificação Geral
  - Classificação dos Mandantes
  - Classificação dos Visitantes.
- Alterar os placares das partidas (admin).
- Filtrar as partidas (admin):
  - Em andamento
  - Finalizada
- Finalizar partidas.

## Como utilizar

### Front-end
Para abordagem visual, acessar a aplicação através de porta 3000.

Para utilizar as funcionalidades do aplicativo no frontend, é necessário primeiro fazer login com um usuário cadastrado, usuário de login e senha informado estão fornacidos no seeder ou no banco de dados.


### Back-end

Para as requisições backend utilizar o ThunderClient, Postman, Insomnia e afins. Basta importar o arquivo de coleção de requisições fornecido e começar as chamadas API.

Para as requisições no backend, também é necessário fazer login (POST /login). Após o login bem-sucedido, o backend irá gerar um token (bearer), que será utilizado em algumas requisições para autenticar e autorizar o acesso ao backend.
, que deve ser apresentado no header Authentication com o seguinte formato: bearer: _token_.


### Senhas

As senhas armazenadas no banco de dados estão criptografadas e as senhas reais podem ser encontradas nos seeders do projeto, para fins de teste e desenvolvimento.

### Permissões

Para aproveitamento de todas as funcionalidades do apicativo realizar o login como _admin_.

### Rodando os testes locais

Para execução dos testes (unitários) utilizar o comando `npm run test` dentro da pasta trybe-futebol-clube/app/backend 

## Licença

Licença [MIT](https://github.com/matheusrosa1/trybe-futebol-clube?tab=MIT-1-ov-file) 

## Contato

Instruções sobre como entrar em contato com os mantenedores do projeto. Isso pode incluir links para o perfil do GitHub, endereço de e-mail, etc.
