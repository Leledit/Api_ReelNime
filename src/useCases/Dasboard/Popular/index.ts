import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { DasboardPopularUseCase } from "./Popular.ts";
import { DasboardPopularController } from "./PopularController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const dasboardPopularUseCase = new DasboardPopularUseCase(
  mongoDashboardRepository
);
const dasboardPopularController = new DasboardPopularController(
  dasboardPopularUseCase
);

export { dasboardPopularUseCase, dasboardPopularController };
