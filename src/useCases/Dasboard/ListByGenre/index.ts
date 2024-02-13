import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.js";
import { ListByGenreDasboardUseCase } from "./ListByGenre.js";
import { ListByGenreController } from "./ListByGenreController.js";

const mongoDashboardRepository = new MongoDashboardRepository();
const listByGenreDasboardUseCase = new ListByGenreDasboardUseCase(
  mongoDashboardRepository
);
const listByGenreController = new ListByGenreController(
  listByGenreDasboardUseCase
);

export { listByGenreDasboardUseCase, listByGenreController };
