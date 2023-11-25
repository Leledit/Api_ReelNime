import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { RegisterFilmeUseCase } from "./Register.ts";
import { RegisterFilmeController } from "./RegisterController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const registerFilmeUseCase = new RegisterFilmeUseCase(mongoFilmeRepository);
const registerFilmeController = new RegisterFilmeController(registerFilmeUseCase);

export {registerFilmeUseCase, registerFilmeController};