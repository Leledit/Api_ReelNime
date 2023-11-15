import { interfaceAnimes, interfaceAnimesGet } from "../models/animes.model";
import clienteDbMongo from "../config/mongoDbConfig.ts";
import { ObjectId } from "mongodb";
class AnimesServices {
  static async registerData(data: interfaceAnimes) {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
      const resultRequest = await collectionAnimes.insertOne(data);
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo anime");
    }
  }

  static async checkRecordExistence(identifier: string) {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
      const resultRequest = await collectionAnimes.findOne({
        name: identifier,
      });
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um anime");
    }
  }

  static async getAllRecords() {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimesGet>("animes");
      const resultRequest = await collectionAnimes
        .find<interfaceAnimesGet>({})
        .toArray();
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao obter todos os animes: " + error);
    }
  }

  static async alterOneRecord(data: interfaceAnimes, idDoc: string) {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
      const resultRequest = await collectionAnimes.updateOne(
        { _id: new ObjectId(idDoc) },
        {
          $set: {
            date: data.date,
            name: data.name,
            alreadyAttended: data.alreadyAttended,
            qtdEpisodes: data.qtdEpisodes,
            dateLaunch: data.dateLaunch,
            note: data.note,
            status: data.status,
            nextSeason: data.nextSeason,
            prevSeason: data.prevSeason,
            synopsis: data.synopsis,
            urlImg: data.urlImg,
          },
        }
      );
      return resultRequest;
    } catch (error) {
      throw new Error("erro ao atualizar um anime: " + error);
    }
  }

  static async getOneRecord(idDoc: string){
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
      const resultRequest = await collectionAnimes.findOne({ _id: new ObjectId(idDoc) });
      return resultRequest;
    } catch (error) {
      throw new Error("erro ao recuperar um anime: " + error);
    }
  }

  static async deleteOne(idDoc: string) {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
      const resultRequest = collectionAnimes.deleteOne({ _id: new ObjectId(idDoc) });
      return resultRequest;
    } catch (error) {
      throw new Error("erro ao deletar um anime: " + error);
    }
  }
  
  static async returnPaginationValues(initial:number,finalValue:number){
      try{
        const refDb = clienteDbMongo();
        const collectionAnimes = refDb.collection<interfaceAnimes>("animes");
        const resultRequest = await collectionAnimes.find().skip(initial).limit(finalValue).toArray();
        return resultRequest;
      }catch (error) {
        throw new Error("erro ao buscar animes(paginação): " + error);
      }
  }
}

export default AnimesServices;
