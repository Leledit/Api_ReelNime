import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { LoginUserUseCase } from "./Login.ts";
import { LoginUserController } from "./LoginController.ts";

const mongoUserRepository = new MongoUserRepository();
const loginUserUseCase = new LoginUserUseCase(mongoUserRepository);
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserUseCase, loginUserController };