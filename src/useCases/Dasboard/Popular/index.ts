import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { PopularUseCase } from "./Popular.ts";
import { PopularController } from "./PopularController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const popularUseCase = new PopularUseCase(mongoDashboardRepository);
const popularController = new PopularController(popularUseCase);

export { popularUseCase, popularController };

