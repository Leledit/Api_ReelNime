import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { DasboardListByYearUseCase } from "./ListByYear.js";
import { DasboardListByYearController } from "./ListByYearController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const dasboardListByYearUseCase = new DasboardListByYearUseCase(
  mongoDashboardRepository
);
const dasboardListByYearController = new DasboardListByYearController(
  dasboardListByYearUseCase
);

export { dasboardListByYearUseCase, dasboardListByYearController };
