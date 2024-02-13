import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimePaginationUseCase } from "./Pagination.ts";
import { AnimePaginationController } from "./PaginationController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animePaginationUseCase = new AnimePaginationUseCase(mongoAnimeRepository);
const animePaginationController = new AnimePaginationController(
  animePaginationUseCase
);

export { animePaginationUseCase, animePaginationController };
