import { Request, Response } from "express";
import { DasboardRecentlyAddedUseCase } from "./RecentlyAdded.ts";

export class DasboardRecentlyAddedController {
  constructor(
    private dasboardRecentlyAddedUseCase: DasboardRecentlyAddedUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const recentylAdded = await this.dasboardRecentlyAddedUseCase.execute();

      return res.status(200).json(recentylAdded);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
