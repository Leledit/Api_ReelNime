import { Request, Response } from "express";
import { DashboardReleasesUseCase } from "./Releases.ts";

export class DashboardReleasesController {
  constructor(private dashboardReleasesUseCase: DashboardReleasesUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const releasesData = await this.dashboardReleasesUseCase.execute();

      return res.status(200).json(releasesData);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
