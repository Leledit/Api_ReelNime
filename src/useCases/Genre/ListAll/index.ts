import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.js";
import { ListAllGenresUseCase } from "./ListAll.js";
import { ListAllGenreController } from "./ListAllController.js";

const mongoGenreRepository = new MongoGenreRepository();

const listAllGenresUseCase = new ListAllGenresUseCase(mongoGenreRepository);

const listAllGenresController = new ListAllGenreController(
  listAllGenresUseCase
);

export { listAllGenresUseCase, listAllGenresController };
