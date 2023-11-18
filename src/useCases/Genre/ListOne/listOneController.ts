import { Request, Response } from "express";
import { ListOneGenresUseCase } from "./listOne.js";
import { searchGenreScheme } from "./shceme.js";

export class ListOneGenreController{
    constructor(private listOneGenresUseCase:ListOneGenresUseCase){}
    async handle(request: Request, response: Response): Promise<Response> {
        const {error} = searchGenreScheme.validate(request.query);
        
        if(error){
            return response.status(400).send(error.message);
        }

        const query = request.query.query as string;

        try {
            const dataGenre = await this.listOneGenresUseCase.execute({name:query});
            return response.status(200).json(dataGenre); 
        } catch (err:any) {
            return response.status(400).json("Erro na solicitação: " + err.message);
        }

    }
}