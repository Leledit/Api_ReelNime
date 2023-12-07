import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { FilmeFindByNameGenreUseCase } from "./FindByName.ts";
import { AnimeFindByNameGenreController } from "./FindByNameController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const filmeFindByNameGenreUseCase = new FilmeFindByNameGenreUseCase(mongoAnimeRepository);
const animeFindByNameGenreController = new AnimeFindByNameGenreController(filmeFindByNameGenreUseCase);

export { filmeFindByNameGenreUseCase, animeFindByNameGenreController };
