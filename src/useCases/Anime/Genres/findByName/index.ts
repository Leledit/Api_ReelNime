import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeGenreFindByNameUseCase } from "./FindByName.ts";
import { AnimeFindByNameGenreController } from "./FindByNameController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeGenreFindByNameUseCase = new AnimeGenreFindByNameUseCase(
  mongoAnimeRepository
);
const animeFindByNameGenreController = new AnimeFindByNameGenreController(
  animeGenreFindByNameUseCase
);

export { animeGenreFindByNameUseCase, animeFindByNameGenreController };
