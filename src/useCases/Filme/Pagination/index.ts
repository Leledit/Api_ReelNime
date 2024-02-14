import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmePaginationUseCase } from "./Pagination.ts";
import { FilmePaginationController } from "./PaginationController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmePaginationUseCase = new FilmePaginationUseCase(mongoFilmeRepository);
const filmePaginationController = new FilmePaginationController(
  filmePaginationUseCase
);

export { filmePaginationUseCase, filmePaginationController };
