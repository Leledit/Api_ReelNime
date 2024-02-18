import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { UserListUseCase } from "./List.ts";
import { UserListController } from "./ListController.ts";

const mongoUserRepository = new MongoUserRepository();
const userListUseCase = new UserListUseCase(mongoUserRepository);
const userListController = new UserListController(userListUseCase);

export { userListUseCase, userListController };
