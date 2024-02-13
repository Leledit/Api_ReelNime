import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeGenresAddUseCase } from "./Add.ts";
import { FilmeGenresAddController } from "./AddController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeGenresAddUseCase = new FilmeGenresAddUseCase(mongoFilmeRepository);
const filmeGenresAddController = new FilmeGenresAddController(
  filmeGenresAddUseCase
);

export { filmeGenresAddUseCase, filmeGenresAddController };
