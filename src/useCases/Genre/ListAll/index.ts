import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { ListAllGenresUseCase } from "./listAll.ts";
import { ListAllGenreController } from "./listAllController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const listAllGenresUseCase = new ListAllGenresUseCase(mongoGenreRepository);

const listAllGenresController = new ListAllGenreController(
  listAllGenresUseCase
);

export { listAllGenresUseCase, listAllGenresController };
