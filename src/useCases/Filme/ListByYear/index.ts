import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeLitByYearUseCase } from "./ListByYear.ts";
import { FilmeLitByYearController } from "./ListByYearController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeLitByYearUseCase = new FilmeLitByYearUseCase(mongoFilmeRepository);
const filmeLitByYearController = new FilmeLitByYearController(
  filmeLitByYearUseCase
);

export { filmeLitByYearUseCase, filmeLitByYearController };
