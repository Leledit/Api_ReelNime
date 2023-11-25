import { NextFunction, Request, Response } from "express";
import { PaginationFilmeUseCase } from "./Pagination.ts";
import { paginationFilmeScheme } from "./scheme.ts";

export class PaginationFilmeController {
  constructor(private paginationFilmeUseCase: PaginationFilmeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = paginationFilmeScheme.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }
    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const { page, limit } = req.body;

      const dataFilmes = await this.paginationFilmeUseCase.execute({
        page,
        limit,
      });

      if (dataFilmes !== null) {
        return res.status(201).json(dataFilmes);
      } else {
        return res.status(400).send("Não ha filmes");
      }
    } catch (err: any) {
      return res.status(400).json("Erro na solicitaçãoss: " + err.message);
    }
  }
}
