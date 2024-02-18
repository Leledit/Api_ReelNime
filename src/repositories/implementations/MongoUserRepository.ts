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
          {
            email: resultRequest.email,
            name: resultRequest.name,
            password: resultRequest.password,
            type: resultRequest.type,
          },
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

  async delete(id: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();
      const collectionFilme = refDb.collection("user");
      const resultRequest = await collectionFilme.deleteOne({ id: id });

      if (resultRequest.deletedCount === 0) {
        throw new Error("id invalido");
      } else {
        return true;
      }

    } catch (error: any) {
      throw new Error("erro ao deletar um usuario, " + error.message);
    }
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
