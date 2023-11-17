import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Genre } from "../../entities/Genre.ts";
import { IGenreRepository } from "../IGenreRepository";

export class MongoGenreRepository implements IGenreRepository {
  async save(genre: Genre): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres.insertOne(genre);
    } catch (error) {
      throw new Error("Falha ao cadastrar um genero: " + error);
    }
  }

  async findByName(genre: Genre): Promise<Genre> {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres.findOne({
        name: genre.name,
      });

      if (resultRequest) {
        return new Genre({
          name: resultRequest.name,
          registrationDate: resultRequest.registrationDate,
        });
      } else {
        return new Genre({ name: "" });
      }
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um genero");
    }
  }


  async findAll(): Promise<Genre[]> {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres
        .find({})
        .toArray();
      
      let genre:Genre[] = [];
      resultRequest.map((item)=>{
          genre.push({name:item.name,id:item.id,registrationDate:item.registrationDate});
      })
      return genre
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }
}
