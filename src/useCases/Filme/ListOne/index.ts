import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { ListOneFilmeUseCase } from "./ListOne.ts";
import { ListOneFilmeController } from "./ListOneController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const listOneFilmesUseCase = new ListOneFilmeUseCase(mongoFilmeRepository);
const listOneFilmesController = new ListOneFilmeController(
  listOneFilmesUseCase
);

export { listOneFilmesUseCase, listOneFilmesController };
