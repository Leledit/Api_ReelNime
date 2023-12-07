import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { FindByNameUseCase } from "./FindByName.ts";
import { FindByNameController } from "./FindByNameController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const findByNameUseCase = new FindByNameUseCase(mongoAnimeRepository);
const findByNameController = new FindByNameController(findByNameUseCase);

export { findByNameUseCase, findByNameController };
