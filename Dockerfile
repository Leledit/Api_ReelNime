# Use a imagem Node.js
FROM node:20-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Instale o cliente MongoDB
RUN apk add --no-cache mongodb-tools

RUN npm install --production=false

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]