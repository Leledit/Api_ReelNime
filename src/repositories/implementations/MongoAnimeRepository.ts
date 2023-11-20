import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime";
import { IAnimeRepository } from "../IAnimeRepository";

export class MongoAnimeRepository implements IAnimeRepository {
  async save(anime: Anime): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      await collectionAnimes.insertOne(anime);
    } catch (error: any) {
      throw new Error("Falha ao cadastrar um anime: " + error.message);
    }
  }
}
