import express, { Express, Request, Response } from "express";
import cors from "cors";
import DashboardController from "./controller/dashboard.ts";
import GenresController from "./controller/genres.controller.ts";
import { FirebaseConfig } from "./config/firebaseConfig.ts";

class App {
  server: Express;
  port: number | string;
  dashboard: DashboardController;
  genres: GenresController;

  constructor() {
    this.server = express();
    this.middlewares();
    this.port = process.env.PORT || 8080;
    //iniciando a configuração do firebase
    FirebaseConfig.initializeConfig();
    //Criando instancias dos controladores das rotas
    this.dashboard = new DashboardController();
    this.genres = new GenresController();
    //Configurando as rotas da aplicação
    this.routes();
  }
  middlewares() {
    //permitindo todas as chamadas
    this.server.use(cors());
    //aceita solicitações do tipo json
    this.server.use(express.json());
  }
  routes() {
    //criando rotas da api
    this.server.get("/api/v1/", this.dashboard.getRouter());
    this.server.post("/api/v1/genres/", this.genres.getRouter());
    this.server.get("/api/v1/genres/search", this.genres.getRouter());
    this.server.get("/api/v1/genres/", this.genres.getRouter());
    this.server.put("/api/v1/genres/:id", this.genres.getRouter());
    this.server.delete("/api/v1/genres/:id", this.genres.getRouter());
  }
}
//intanciando a classe
const app = new App();
//Criando o servidor node
app.server.listen(app.port, () => {
  console.log(`Servidor iniciado na porta ${app.port}`);
});
