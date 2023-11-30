import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { ListOneGenresUseCase } from "./ListOne.ts";
import { ListOneGenreController } from "./ListOneController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const listOneGenresUseCase = new ListOneGenresUseCase(mongoGenreRepository);

const listOneGenreController = new ListOneGenreController(listOneGenresUseCase);

export { listOneGenresUseCase, listOneGenreController };
