import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeListByYearUseCase } from "./ListByYear.ts";
import { AnimeListByYearController } from "./ListByYearController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeListByYearUseCase = new AnimeListByYearUseCase(mongoAnimeRepository);
const animeListByYearController = new AnimeListByYearController(animeListByYearUseCase);

export {animeListByYearUseCase, animeListByYearController}