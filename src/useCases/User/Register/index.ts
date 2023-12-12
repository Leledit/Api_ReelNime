import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { RegisterUserUseCase } from "./Register.ts";
import { RegisterUserController } from "./RegisterController.ts";

const mongoUserRepository = new MongoUserRepository();
const registerUserUsecase = new RegisterUserUseCase(mongoUserRepository);
const registerUserController = new RegisterUserController(registerUserUsecase);

export { registerUserUsecase, registerUserController };
