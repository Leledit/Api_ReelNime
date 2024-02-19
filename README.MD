<h1 align="center">Api ReelNime</h1>

![Linguagem mais usada](https://img.shields.io/github/languages/top/Leledit/Api_ReelNime)
![Numero de lingaugens usadas](https://img.shields.io/github/languages/count/Leledit/Api_ReelNime)
![Lincense](https://img.shields.io/github/license/Leledit/Api_ReelNime)
![Tamanho do projeto](https://img.shields.io/github/languages/code-size/Leledit/Api_ReelNime)

# Descrição do projeto

Este projeto visa o desenvolvimento de uma API RESTful dedicada ao gerenciamento de registros relacionados a filmes e séries. Minha principal motivação para este empreendimento é a oportunidade de aprimorar minhas habilidades na construção de APIs REST e de me familiarizar com a utilização do Node.js em conjunto com o framework Express.

Além disso, uma outra motivação significativa para este projeto foi a oportunidade de aprender a criar documentações utilizando a ferramenta "Swagger", amplamente reconhecida e utilizada em diversas aplicações. Adicionalmente, este projeto proporcionou minha primeira experiência prática com testes, um aspecto do desenvolvimento de software com o qual ainda não havia tido contato

# Iniciando o projeto

Para iniciar o projeto, devemos executar o script "dev"

    npm run dev

agora a aplicação ja pode ser testa, para isso pode ser usada a ferramenta "postman"

# Abrindo a documentação (swagger)

Para abrir a documentação do projeto, devemos executar o mesmo. depois deve ser aberto um navegador e digitado a url abaixo.

    http://localhost:8080/api-docs/#/

# Variaveis de ambiente

para executar o projeto, deve ser criado um arquivo de variaveis de ambientes(locais), contendo as variavies abaixo

    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\User\Documents\Chaves de acesso\firebase\siteAnimes.json"

# Banco de dados

Se desejar testar a aplicação com dados já cadastrados, siga os passos abaixo:

- Crie um banco de dados MongoDB chamado "ReelNime".
- Crie as coleções "animes", "filmes", "genres" e "user" no banco de dados.
- Vá até a pasta "bd" do projeto e importe os arquivos JSON que contêm os dados iniciais para as respectivas \* \* coleções no banco de dados MongoDB.

# Tecnicas e tecnologias usadas

- bcrypt
- body-parser
- cors
- dotenv
- express
- firebase-admin
- joi
- jsonwebtoken
- mongodb
- mongoose
- multer
- swagger-ui-express
- ts-node
- uuidv4
