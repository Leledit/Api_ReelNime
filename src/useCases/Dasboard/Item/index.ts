import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { DasboardItemUseCase } from "./Item.js";
import { DasboardItemController } from "./ItemController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const dasboardItemUseCase = new DasboardItemUseCase(mongoDashboardRepository);
const dasboardItemController = new DasboardItemController(dasboardItemUseCase);

export { dasboardItemUseCase, dasboardItemController };
