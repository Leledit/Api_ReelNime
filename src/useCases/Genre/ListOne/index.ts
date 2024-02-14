import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { GenerListOnelUseCase } from "./ListOne.ts";
import { GenerListOnelController } from "./ListOneController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const generListOnelUseCase = new GenerListOnelUseCase(mongoGenreRepository);

const generListOnelController = new GenerListOnelController(
  generListOnelUseCase
);

export { generListOnelUseCase, generListOnelController };
