import { NextFunction, Request, Response } from "express";
import { PaginationAnimeUseCase } from "./Pagination.ts";
import { paginationAnimeScheme } from "./scheme.ts";

export class PaginationAnimeController {
  constructor(private paginationAnimeUseCase: PaginationAnimeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = paginationAnimeScheme.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const { page, limit } = req.body;

      const dataAnimes = await this.paginationAnimeUseCase.execute({
        page,
        limit,
      });
      return res.status(201).json(dataAnimes);
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
