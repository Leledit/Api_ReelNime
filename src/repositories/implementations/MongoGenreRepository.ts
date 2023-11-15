import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Genre } from "../../entities/Genre";
import { IGenreRepository } from "../IGenreRepository";

export class MongoGenreRepository implements IGenreRepository{
    async save(genre: Genre): Promise<void> {
        /*try {
            const refDb = clienteDbMongo();
            const collectionGenres = refDb.collection("genres");
            const resultRequest = await collectionGenres.insertOne(genre);
          } catch (error) {
            throw new Error("Falha ao cadastrar um genero: " + error);
          }*/
          /*console.log("---------");
          console.log(genre);*/

          
    }
}