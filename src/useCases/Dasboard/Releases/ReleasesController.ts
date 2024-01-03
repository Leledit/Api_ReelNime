import { Request, Response } from "express";
import { ReleasesUseCase } from "./Releases.ts";

export class ReleasesController {
  constructor(private releasesUseCase: ReleasesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const releasesData = await this.releasesUseCase.execute();

      return res.status(200).json(releasesData);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
