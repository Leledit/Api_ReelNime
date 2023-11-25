import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { ListOneGenresUseCase } from "./listOne.ts";
import { ListOneGenreController } from "./listOneController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const listOneGenresUseCase = new ListOneGenresUseCase(mongoGenreRepository);

const listOneGenreController = new ListOneGenreController(listOneGenresUseCase);

export { listOneGenresUseCase, listOneGenreController };
