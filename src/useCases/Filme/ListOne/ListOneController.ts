import { Request, Response } from "express";
import { listOneFilmeSchema } from "./scheme.ts";
import { ListOneFilmeUseCase } from "./ListOne.ts";

export class ListOneFilmeController{
    constructor(private listOneFilmeUseCase: ListOneFilmeUseCase){}
    async handle(request: Request, response: Response): Promise<Response> {
        const {error} = listOneFilmeSchema.validate(request.params);

        if (error) {
            return response.status(400).send(error.message);
        }
        
        try{
            const idFilme = request.params.id;
            const dataFilme = await this.listOneFilmeUseCase.execute({id:idFilme});

            if(dataFilme === null){
                throw new Error("Filme  não encontrado");
            }else{
                return response.status(201).json(dataFilme);
            }
        }catch(err:any){
            return response.status(400).json("Erro na solicitação: " + err.message);
        }
    }
}