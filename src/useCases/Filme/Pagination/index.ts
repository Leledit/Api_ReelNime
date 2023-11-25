import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { PaginationFilmeUseCase } from "./Pagination.ts";
import { PaginationFilmeController } from "./PaginationController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const paginationFilmeUseCase = new PaginationFilmeUseCase(mongoFilmeRepository);
const paginationFilmeController = new PaginationFilmeController(
  paginationFilmeUseCase
);

export { paginationFilmeUseCase, paginationFilmeController };
