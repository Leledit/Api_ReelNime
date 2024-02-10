import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { ListByYearDasboardUseCase } from "./ListByYear.js";
import { ListByYearController } from "./ListByYearController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const listByYearDasboardUseCase = new ListByYearDasboardUseCase(
  mongoDashboardRepository
);
const listByYearController = new ListByYearController(
  listByYearDasboardUseCase
);

export { listByYearDasboardUseCase, listByYearController };
