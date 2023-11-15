import { Router,Request,Response} from "express";

class DashboardController{
    private router: Router;

    constructor(){
        this.router = Router();
        this.setupRouter();
    }

    private setupRouter(){
        this.router.get('/api/v1/', this.getDashboard);
    }

    private getDashboard(req:Request, res:Response){
        console.log("Chamada")
        res.json();
    }

    public getRouter():Router{
        return this.router;
    }
}
export default DashboardController;