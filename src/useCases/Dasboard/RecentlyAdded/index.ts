import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { RecentlyAddedUseCase } from "./RecentlyAdded.ts";
import { RecentlyAddedController } from "./RecentlyAddedController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const recentlyAddedUseCase = new RecentlyAddedUseCase(mongoDashboardRepository);
const recentlyAddedController = new RecentlyAddedController(
  recentlyAddedUseCase
);

export { recentlyAddedUseCase, recentlyAddedController };
