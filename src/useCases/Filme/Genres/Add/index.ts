import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { AddGenresInFilmeUseCase } from "./Add.ts";
import { AddGenresInFilmeController } from "./AddController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const addGenresInFilmeUseCase = new AddGenresInFilmeUseCase(
  mongoFilmeRepository
);
const addGenresInFilmeController = new AddGenresInFilmeController(
  addGenresInFilmeUseCase
);

export { addGenresInFilmeUseCase, addGenresInFilmeController };
