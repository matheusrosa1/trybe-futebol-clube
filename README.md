# Trybe Futebol Clube

## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como utilizar](#como-utilizar)
- [Contribuições](#contribuições)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

O Trybe Futebol Clube é um projeto desenvolvido como parte da formação em back-end durante o curso da Trybe - Escola de Tecnologia. Este aplicativo é um site informativo que fornece informações sobre partidas e classificações de futebol ⚽️. Construído com o objetivo de demonstrar habilidades em desenvolvimento back-end, utilizando tecnologias como Node.js com TypeScript, Sequelize, Docker, Express, JSON Web Token (JWT), Chai e Mocha para testes.

A aplicação segue os princípios do SOLID (Single Responsibility Principle, Open-Closed Principle, Liskov Substitution Principle, Interface Segregation Principle e Dependency Inversion Principle), garantindo um código mais modular, flexível, testável e de fácil manutenção.

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

Instalar as dependências necessárias, execute o comando `npm install` na pasta raiz do projeto. Cada diretório (frontend e backend) possui suas próprias dependências. É possivel instalá-las de maneira rápida executando `npm run install:apps` na pasta raiz do projeto, ou executando `npm install` dentro de cada diretório separadamente.

### Containers Docker

Para iniciar a aplicação localmente em containers Docker, basta executar o comando `npm run compose:up` na raiz do projeto. Ao instalar o container, se corretamente instalado, o banco de dados já será iniciado e os servidores serão automaticamente inicializados.


#### Logs do container

##### Back-end

    docker logs -f app_backend

##### Front-end
    docker logs -f app_frontend

### Acesso ao banco de dados

A senha padrão para acessar o banco de dados SQL está definida na porta definida por padrão `3306` e pode ser encontrada no arquivo `docker-compose.yaml`.

Resetar o banco de dados: utilizar o comando `npm run db:reset` dentro do container backend.

## Funcionalidades

- Alterar os placares das partidas (admin).
- Filtrar as partidas:
  - Em andamento
  - Finalizada
- Finalizar partidas (admin).
- Visualizar a Classificação dos times de acordo com os resultados e suas respectivas estatística dos jogos de cada time.
- Filtrar a classificação:
  - Classificação Geral;
  - Classificação dos Mandantes;
  - Classificação dos Visitantes.

A classificação dos times no campeonato é de acordo com o `total de pontos` (decrescente), com o seguinte critério de desempate:
  - Total de Vitórias;
  - 2º Saldo de gols;
  - 3º Gols a favor.

## Como utilizar

### Front-end

Acessar a aplicação através de porta 3000, definida como padrão do projeto.

Para utilizar as funcionalidades do aplicativo no frontend, é necessário primeiro fazer login com um usuário cadastrado, as informações de login estão fornecidos no seeder ou no banco de dados.


### Back-end

Utilizar ThunderClient, Postman, Insomnia e afins. Basta importar o arquivo de coleção de requisições fornecido (trybe-futebol-clube/app/thunder-collection_Trybe Futebol Clube.json) e começar as chamadas API.

Para as requisições no backend, também é necessário fazer login (POST /login). Após o login bem-sucedido, o backend irá gerar um token (bearer), que será utilizado em algumas requisições para autenticar e autorizar o acesso ao backend.
, que deve ser apresentado no header Authentication com o seguinte formato: bearer: _token_


### Senhas

As senhas armazenadas no banco de dados estão criptografadas e as senhas reais podem ser encontradas nos seeders do projeto, para fins de teste e desenvolvimento.

### Permissões

Para aproveitamento de todas as funcionalidades do apicativo realizar o login como _admin_.

### Rodando os testes locais

Utilizar o comando `npm run test` dentro da pasta trybe-futebol-clube/app/backend

## Website

O aplicativo está disponível para consulta no link https://trybe-futebol-clube-production-cd38.up.railway.app/.

As funcionalidades de `admin` podem ser utilizadas somente via localhost, visto que o website é voltado somente para demonstração de portifólio.

## Contribuições

O front-end e o design CSS deste projeto foram elaborados pela escola Trybe.


## Licença

Licença [MIT](https://github.com/matheusrosa1/trybe-futebol-clube?tab=MIT-1-ov-file) 


## Contato

- Linkedin: https://www.linkedin.com/in/matheus-rosa-2a0652201/
- E-mail: matheusrosataxa@gmail.com
