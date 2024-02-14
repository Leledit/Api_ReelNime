import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { UserLoginUseCase } from "./Login.ts";
import { UserLoginController } from "./LoginController.ts";

const mongoUserRepository = new MongoUserRepository();
const userLoginUseCase = new UserLoginUseCase(mongoUserRepository);
const userLoginController = new UserLoginController(userLoginUseCase);

export { userLoginUseCase, userLoginController };
