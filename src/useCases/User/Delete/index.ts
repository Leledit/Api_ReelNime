import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { UserDeleteUseCase } from "./Delete.ts";
import { UserDeleteController } from "./DeleteController.ts";

const mongoUserRepository = new MongoUserRepository();
const userDeleteUseCase = new UserDeleteUseCase(mongoUserRepository);
const userDeleteController = new UserDeleteController(userDeleteUseCase);

export { userDeleteUseCase, userDeleteController };
