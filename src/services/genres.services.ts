import { InterfaceGenres } from "../models/genres.model";
import {
  DocumentData,
  QueryDocumentSnapshot,
  getFirestore,
} from "firebase-admin/firestore";
import clienteDbMongo from "../config/mongoDbConfig.ts";
import { ObjectId } from "mongodb";

class GenresServices {
  static async registerData(data: InterfaceGenres) {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection<InterfaceGenres>("genres");
      const resultRequest = await collectionGenres.insertOne(data);
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao cadastrar um genero: " + error);
    }
  }

  static async checkRecordExistence(identifier: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection<InterfaceGenres>("genres");
      const resultRequest = await collectionGenres.findOne({
        nameGenre: identifier,
      });
      if (resultRequest === null) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um genero");
    }
  }

  static async getAllRecords() {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres
        .find<InterfaceGenres>({})
        .toArray();
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }

  static async search(query: string) {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres
        .find({ nameGenre: { $regex: query, $options: "i" } })
        .toArray();
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao buscar generos: " + error);
    }
  }

  static async deleteARecord(idDoc: string) {
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const requestResult = await collectionGenres.deleteOne({_id:new ObjectId(idDoc)});
      return requestResult;
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }

  static async putUpdateRecord(idDoc: string, dataReq: InterfaceGenres) {
   
    try {
      const refDb = clienteDbMongo();
      const collectionGenres = refDb.collection("genres");
      const resultRequest = await collectionGenres.updateOne(
        {_id: new ObjectId(idDoc)},
        {
          $set: {
            nameGenre: dataReq.nameGenre,
          }
        }
      )
      return resultRequest;
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }
}
export default GenresServices;
