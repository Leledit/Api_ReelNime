import { User } from "../../../entities/User.ts";
import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { UserListDTO } from "./ListDTO.ts";

export class UserListUseCase {
  constructor(private mongoUserRepository: MongoUserRepository) {}
  async execute(data: UserListDTO): Promise<User | undefined> {
    const resutlData = await this.mongoUserRepository.searchingByEmail(
      data.email
    );

    if (resutlData) {
      const user = new User(
        {
          email: resutlData.email,
          name: resutlData.name,
          password: "",
          type: resutlData.type,
        },
        resutlData.id
      );
      return user;
    } else {
      return undefined;
    }
  }
}
