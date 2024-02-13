import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { DashboardListByGenreUseCase } from "./ListByGenre.js";
import { DashboardListByGenreController } from "./ListByGenreController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const dashboardListByGenreUseCase = new DashboardListByGenreUseCase(
  mongoDashboardRepository
);
const dashboardListByGenreController = new DashboardListByGenreController(
  dashboardListByGenreUseCase
);

export { dashboardListByGenreUseCase, dashboardListByGenreController };
