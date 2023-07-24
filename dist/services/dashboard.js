import { Router } from "express";
class dashboard {
    constructor() {
        this.router = Router();
        this.setupRouter();
    }
    setupRouter() {
        this.router.get('/', () => { this.getDashboard; });
    }
    getDashboard(req, res) {
        console.log("Ola mundo");
        res.json();
    }
    getRouter() {
        return this.router;
    }
}
export default dashboard;
