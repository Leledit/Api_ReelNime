import { Request, Response } from "express";
import { PaginationAnimeUseCase } from "./Pagination.ts";
import { paginationAnimeScheme } from "./scheme.ts";

export class PaginationAnimeController {
  constructor(private paginationAnimeUseCase: PaginationAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = paginationAnimeScheme.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    const { page, limit } = request.body;

    try {
      const dataAnimes = await this.paginationAnimeUseCase.execute({
        page,
        limit,
      });
      return response.status(201).json(dataAnimes);
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
