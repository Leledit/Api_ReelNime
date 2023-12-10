
import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeFindByNameGenreUseCase } from "./FindByName.ts";
import { FilmeFindByNameGenreController } from "./FindByNameController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeFindByNameGenreUseCase = new FilmeFindByNameGenreUseCase(mongoFilmeRepository);
const filmeFindByNameGenreController = new FilmeFindByNameGenreController(filmeFindByNameGenreUseCase);

export { filmeFindByNameGenreUseCase, filmeFindByNameGenreController };
