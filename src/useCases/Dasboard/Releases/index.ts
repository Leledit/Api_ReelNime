import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { DashboardReleasesUseCase } from "./Releases.ts";
import { DashboardReleasesController } from "./ReleasesController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const dashboardReleasesUseCase = new DashboardReleasesUseCase(
  mongoDashboardRepository
);
const dashboardReleasesController = new DashboardReleasesController(
  dashboardReleasesUseCase
);

export { dashboardReleasesUseCase, dashboardReleasesController };
