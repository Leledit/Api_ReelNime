import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Filme } from "../../entities/Filme.ts";
import { IFilmeRepository } from "../IFilmeRepository.ts";

export class MongoFilmeRepository implements IFilmeRepository {
  async findByName(name: string): Promise<boolean> {
    const refDb = clienteDbMongo();
    try {
      const resultRequest = await refDb.collection("filmes").findOne({
        name: name,
      });
      if (resultRequest) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um filme");
    }
  }
  async save(filme: Filme): Promise<void> {
    const refDb = clienteDbMongo();
    try {
      await refDb.collection("filmes").insertOne(filme);
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo filme");
    }
  }
}
