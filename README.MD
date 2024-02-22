<h1 align="center">Api ReelNime</h1>

![Linguagem mais usada](https://img.shields.io/github/languages/top/Leledit/Api_ReelNime)
![Numero de lingaugens usadas](https://img.shields.io/github/languages/count/Leledit/Api_ReelNime)
![Lincense](https://img.shields.io/github/license/Leledit/Api_ReelNime)
![Tamanho do projeto](https://img.shields.io/github/languages/code-size/Leledit/Api_ReelNime)

# Project description

This project aims to develop a RESTful API dedicated to managing records related to films and series. My main motivation for this venture is the opportunity to improve my skills in building REST APIs and to familiarize myself with using Node.js in conjunction with the Express framework.

Furthermore, another significant motivation for this project was the opportunity to learn how to create documentation using the "Swagger" tool, widely recognized and used in various applications. Additionally, this project provided my first practical experience with testing, an aspect of software development with which I had not yet had contact.

# Starting the project

To start the project, we must run the "dev" script

    npm run dev

Now the application can be tested, for this you can use the "postman" tool

# Opening documentation (swagger)

To open the project documentation, we must execute the same. Then a browser must be opened and the URL below entered.

    http://localhost:8080/api-docs/#/

# Environment variables

To execute the project, an environment (local) variables file must be created, containing the variations below

    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\User\Documents\Chaves de acesso\firebase\siteAnimes.json"

# Database

If you wish to test the application with data already registered, follow the steps below:

- Create a MongoDB database called "ReelNime".
- Create the "animes", "movies", "genres" and "user" collections in the database.
- Go to the project's "bd" folder and import the JSON files that contain the initial data into the respective \* \* collections in the MongoDB database.

# Techniques and technologies used

- bcrypt: "^5.1.1"
- body-parser: "^1.20.2"
- cors: "^2.8.5",
- dotenv: "^16.3.1",
- express: "^4.18.2",
- firebase-admin: "^11.10.1",
- joi: "^17.9.2",
- jsonwebtoken: "^9.0.2",
- mongodb: "5.7",
- mongoose: "^7.4.0",
- multer: "^1.4.5-lts.1",
- swagger-ui-express: "^5.0.0",
- ts-node: "^10.9.1",
- uuidv4: "^6.2.13"
