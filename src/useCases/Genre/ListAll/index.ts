import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.js";
import { GenerListAllUseCase } from "./ListAll.js";
import { GenerListAllController } from "./ListAllController.js";

const mongoGenreRepository = new MongoGenreRepository();

const generListAllUseCase = new GenerListAllUseCase(mongoGenreRepository);

const generListAllController = new GenerListAllController(generListAllUseCase);

export { generListAllUseCase, generListAllController };
