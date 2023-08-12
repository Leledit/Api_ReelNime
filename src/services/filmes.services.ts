import {
  DocumentData,
  QueryDocumentSnapshot,
  WriteResult,
  getFirestore,
} from "firebase-admin/firestore";
import { interfaceFilme } from "../models/filmes.model";
class FilmesService {
  static async postFilmes(data: interfaceFilme): Promise<string> {
    const db = getFirestore();
    try {
      const docRef = await db.collection("filmes").add(data);
      return docRef.id;
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo filme");
    }
  }
  static async checkRecordExistence(identifier: string): Promise<boolean> {
    const db = getFirestore();
    try {
      const resultQuery = await db
        .collection("filmes")
        .where("name", "==", identifier)
        .get();
      return resultQuery.empty;
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um filme");
    }
  }
}

export default FilmesService;