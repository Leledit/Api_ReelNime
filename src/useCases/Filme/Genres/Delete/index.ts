import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { DeleteGenresInFilmeUseCase } from "./Delete.ts";
import { DeleteGenresInFilmeController } from "./DeleteController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const deleteGenresInFilmeUseCase = new DeleteGenresInFilmeUseCase(
  mongoFilmeRepository
);
const deleteGenresInFilmeController = new DeleteGenresInFilmeController(
  deleteGenresInFilmeUseCase
);

export { deleteGenresInFilmeUseCase, deleteGenresInFilmeController };
