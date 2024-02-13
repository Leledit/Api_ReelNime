import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { ItemDasboardUseCase } from "./Item.js";
import { ItemDashboardController } from "./ItemController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const itemDasboardUseCase = new ItemDasboardUseCase(
  mongoDashboardRepository
);
const itemDashboardController = new ItemDashboardController(
  itemDasboardUseCase
);

export { itemDasboardUseCase, itemDashboardController };
