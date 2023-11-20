import { Request, Response } from "express";
import { ListOneAnimesUseCase } from "./ListOne.ts";
import { listOneAnimeSchema } from "./scheme.ts";

export class ListOneAnimeController{
    constructor(private listOneAnimesUseCase: ListOneAnimesUseCase){}
    async handle(request: Request, response: Response): Promise<Response> {
        const {error} = listOneAnimeSchema.validate(request.params);

        if (error) {
            return response.status(400).send(error.message);
        }
        try{
            const idAnime = request.params.id;
            const dataAnime = await this.listOneAnimesUseCase.execute({id:idAnime});

            if(dataAnime === null){
                throw new Error("Anime não encontrado");
            }else{
                return response.status(201).json(dataAnime);
            }

        }catch(err:any){
            return response.status(400).json("Erro na solicitação: " + err.message);
        }    
    }
}