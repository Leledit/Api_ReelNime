import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { GenresUseCase } from "./Genres.ts";
import { GenresController } from "./GenresController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const genresUseCase = new GenresUseCase(mongoAnimeRepository);
const genresController = new GenresController(genresUseCase);

export { genresUseCase, genresController };
