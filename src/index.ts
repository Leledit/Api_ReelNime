import express,{Express,Request,Response} from 'express';
import cors from 'cors';
import dashboard from './controler/dashboard.ts';
import genres from './controler/genres.ts';

class App{
    server: Express
    port:number | string;
    dashboard: dashboard;
    genres: genres;

    constructor(){
        this.server = express();
        this.middlewares();
        this.port = process.env.PORT || 8080 ;
        //Criando instancias dos controladores das rotas
        this.dashboard = new dashboard();
        this.genres = new genres();
        //Configurando as rotas da aplicação
        this.routes();
    }
    middlewares(){
        //permitindo todas as chamadas
        this.server.use(cors());
        //aceita solicitações do tipo json
        this.server.use(express.json()); 
    }
    routes(){
        //criando rotas da api
        this.server.get('/api/v1/',this.dashboard.getRouter());
        this.server.post('/api/v1/genres/',this.genres.getRouter())

    }
}
//intanciando a classe
const app = new App();
//Criando o servidor node
app.server.listen(app.port,()=>{
    console.log(`Servidor iniciado na porta ${app.port}`);
})