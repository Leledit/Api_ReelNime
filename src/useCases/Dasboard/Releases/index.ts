import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { ReleasesUseCase } from "./Releases.ts";
import { ReleasesController } from "./ReleasesController.ts";

const mongoDashboardRepository = new MongoDashboardRepository();
const releasesUseCase = new ReleasesUseCase(mongoDashboardRepository);
const releasesController = new ReleasesController(releasesUseCase);

export { releasesUseCase, releasesController };
