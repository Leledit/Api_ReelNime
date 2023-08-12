import { InterfaceGenres } from "../models/genres.model";
import {
  DocumentData,
  QueryDocumentSnapshot,
  getFirestore,
} from "firebase-admin/firestore";
class GenresServices {
  
  static async deleteARecord(idDoc: string) {
    const db = getFirestore();
    try {
      db.collection("genres").doc(idDoc).delete();
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }

  static async putUpdateRecord(idDoc: string, dataReq: InterfaceGenres) {
    const db = getFirestore();
    try {
      await db.collection("genres").doc(idDoc).update({
        date: dataReq.date,
        nameGenre: dataReq.nameGenre,
      });
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }

  static async getAllRecords(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const db = getFirestore();
    try {
      const getData = await db.collection("genres").get();
      return getData.docs;
    } catch (error) {
      throw new Error("Falha ao obter todos os generos: " + error);
    }
  }

  static async search(
    query: string
  ): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const db = getFirestore();
    try {
      const genresData = await db
        .collection("genres")
        .where("nameGenre", ">=", query)
        .where("nameGenre", "<=", query + "\uf8ff")
        .get();
      return genresData.docs;
    } catch (error) {
      throw new Error("Falha ao buscar generos: " + error);
    }
  }
  static async registerData(data: InterfaceGenres): Promise<string> {
    const db = getFirestore();
    try {
      const docRef = await db.collection("genres").add(data);
      return docRef.id;
    } catch (error) {
      throw new Error("Falha ao cadastrar um genero");
    }
  }

  static async checkRecordExistence(identifier: string): Promise<boolean> {
    const db = getFirestore();
    try {
      const resultQuery = await db
        .collection("genres")
        .where("nameGenre", "==", identifier)
        .get();
      return resultQuery.empty;
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um genero");
    }
  }
}
export default GenresServices;
