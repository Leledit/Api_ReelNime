import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { User } from "../../entities/User.ts";
import { IUserRepository } from "../IUserRepository.ts";

export class MongoUserRepository implements IUserRepository {
  async searchingByEmail(email: string): Promise<undefined | User> {
    try {
      const refDb = clienteDbMongo();

      const resultRequest = await refDb.collection("user").findOne({
        email: email,
      });

      if (resultRequest) {
        const userData = new User(
          { email: resultRequest.email, password: resultRequest.password },
          resultRequest.id
        );
        return userData;
      } else {
        return undefined;
      }
    } catch (error: any) {
      throw new Error(
        "Falha ao verificar a existencia de um usuario: " + error.message
      );
    }
  }

  async login(user: User): Promise<boolean> {
    return true;
  }

  async register(user: User): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb.collection("user").insertOne(user);

      if (resultRequest.acknowledged === true) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error("Falha ao cadastrar um usuario: " + error.message);
    }
  }
}
