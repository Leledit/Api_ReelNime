import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeGenreFindByNameUseCase } from "./FindByName.ts";
import { FilmeGenreFindByNameController } from "./FindByNameController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeGenreFindByNameUseCase = new FilmeGenreFindByNameUseCase(
  mongoFilmeRepository
);
const filmeGenreFindByNameController = new FilmeGenreFindByNameController(
  filmeGenreFindByNameUseCase
);

export { filmeGenreFindByNameUseCase, filmeGenreFindByNameController };
