import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { DasboardRecentlyAddedUseCase } from "./RecentlyAdded.ts";
import { DasboardRecentlyAddedController } from "./RecentlyAddedController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const dasboardRecentlyAddedUseCase = new DasboardRecentlyAddedUseCase(
  mongoDashboardRepository
);
const dasboardRecentlyAddedController = new DasboardRecentlyAddedController(
  dasboardRecentlyAddedUseCase
);

export { dasboardRecentlyAddedUseCase, dasboardRecentlyAddedController };
