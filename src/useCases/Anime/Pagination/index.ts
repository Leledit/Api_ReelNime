import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { PaginationAnimeUseCase } from "./Pagination.ts";
import { PaginationAnimeController } from "./PaginationController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const paginationAnimeUseCase = new PaginationAnimeUseCase(mongoAnimeRepository);
const paginationAnimeController = new PaginationAnimeController(
  paginationAnimeUseCase
);

export { paginationAnimeUseCase, paginationAnimeController };
