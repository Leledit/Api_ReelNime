import { Request, Response } from "express";
import { PaginationFilmeUseCase } from "./Pagination.ts";
import { paginationFilmeScheme } from "./scheme.ts";

export class PaginationFilmeController {
  constructor(private paginationFilmeUseCase: PaginationFilmeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = paginationFilmeScheme.validate(request.body);
    
    if (error) {
      return response.status(400).send(error.message);
    }

    const { page, limit } = request.body;

    try {
      const dataFilmes = await this.paginationFilmeUseCase.execute({
        page,
        limit,
      });

      if(dataFilmes !== null){
        return response.status(201).json(dataFilmes);
      }else{
        return response.status(400).send("Não ha filmes");
      }
      
    } catch (err: any) {
      return response.status(400).json("Erro na solicitaçãoss: " + err.message);
    }
  }
}
