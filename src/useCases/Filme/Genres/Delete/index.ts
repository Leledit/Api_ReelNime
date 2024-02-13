import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeGenresDeleteUseCase } from "./Delete.ts";
import { FilmeGenresDeleteController } from "./DeleteController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeGenresDeleteUseCase = new FilmeGenresDeleteUseCase(
  mongoFilmeRepository
);
const filmeGenresDeleteController = new FilmeGenresDeleteController(
  filmeGenresDeleteUseCase
);

export { filmeGenresDeleteUseCase, filmeGenresDeleteController };
