import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { DashboardSearchUseCase } from "./Search.ts";
import { DashboardSearchController } from "./SearchController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const dashboardSearchUseCase = new DashboardSearchUseCase(
  mongoDashboardRepository
);
const dashboardSearchController = new DashboardSearchController(
  dashboardSearchUseCase
);

export { dashboardSearchUseCase, dashboardSearchController };
