import express from 'express';
import cors from 'cors';
//import dashboard from './services/dashboard';
/*const dashboardRoutes = new dashboard();
const dashboardRouter = dashboardRoutes.getRouter();
*/
class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.port = process.env.PORT || 8080;
    }
    middlewares() {
        //permitindo todas as chamadas
        this.server.use(cors());
        this.server.use(express.json());
    }
    routes() {
        this.server.use('/', (req, res) => {
            console.log("olas ");
            res.send();
        });
    }
}
const app = new App();
app.server.listen(app.port, () => {
    console.log("Servidor okkk");
});
