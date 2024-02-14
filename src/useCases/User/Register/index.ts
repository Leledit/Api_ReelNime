import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { UserRegisterUseCase } from "./Register.ts";
import { UserRegisterController } from "./RegisterController.ts";

const mongoUserRepository = new MongoUserRepository();
const userRegisterUseCase = new UserRegisterUseCase(mongoUserRepository);
const userRegisterController = new UserRegisterController(userRegisterUseCase);

export { userRegisterUseCase, userRegisterController };
