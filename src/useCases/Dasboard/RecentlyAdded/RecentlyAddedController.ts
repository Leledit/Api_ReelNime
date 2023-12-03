import { Request, Response } from "express";
import { RecentlyAddedUseCase } from "./RecentlyAdded.ts";

export class RecentlyAddedController {
  constructor(private recentlyAddedUseCase: RecentlyAddedUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
        const recentylAdded = await this.recentlyAddedUseCase.execute();
        
        return res.status(200).json(recentylAdded);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
