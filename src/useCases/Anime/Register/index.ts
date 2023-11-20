import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { RegisterAnimesUseCase } from "./Register.ts";
import { RegisterAnimeController } from "./RegisterController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const registerAnimesUseCase = new RegisterAnimesUseCase(mongoAnimeRepository);
const registerAnimeController = new RegisterAnimeController(
  registerAnimesUseCase
);

export { registerAnimesUseCase, registerAnimeController };
