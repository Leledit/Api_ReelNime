import express, { Express, Request, Response } from "express";
import cors from "cors";
import path,{dirname} from "path";
import { fileURLToPath } from 'url';
import DashboardController from "./controller/dashboard.ts";
import GenresController from "./controller/genres.controller.ts";
import { FirebaseConfig } from "./config/firebaseConfig.ts";
import AnimesController from "./controller/animes.controller.ts";

class App {
  server: Express;
  port: number | string;
  __filename;
  __dirname;
  dashboard: DashboardController;
  genres: GenresController;
  animes: AnimesController;

  constructor() {
    this.server = express();
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname  = dirname(this.__filename);
    this.middlewares();
    this.port = process.env.PORT || 8080;
    //iniciando a configuração do firebase
    FirebaseConfig.initializeConfig();
    //Criando instancias dos controladores das rotas
    this.dashboard = new DashboardController();
    this.genres = new GenresController();
    this.animes = new AnimesController();
    //Configurando as rotas da aplicação
    this.routes();
  }
  middlewares() {
    //permitindo todas as chamadas
    this.server.use(cors());
    //aceita solicitações do tipo json
    this.server.use(express.json());

    this.server.use('/files/animes/',express.static(path.join(this.__dirname,'/uploadedFiles/animes')))
  }
  routes() {
    //criando rotas da api
    this.server.get("/api/v1/", this.dashboard.getRouter());
    this.server.post("/api/v1/genres/", this.genres.getRouter());
    this.server.get("/api/v1/genres/search", this.genres.getRouter());
    this.server.get("/api/v1/genres/", this.genres.getRouter());
    this.server.put("/api/v1/genres/:id", this.genres.getRouter());
    this.server.delete("/api/v1/genres/:id", this.genres.getRouter());
    this.server.post("/api/v1/animes/",this.animes.getRouter());
  }
}
//intanciando a classe
const app = new App();
//Criando o servidor node
app.server.listen(app.port, () => {
  console.log(`Servidor iniciado na porta ${app.port}`);
});
