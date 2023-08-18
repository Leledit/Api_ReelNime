import {
  DocumentData,
  QueryDocumentSnapshot,
  WriteResult,
  getFirestore,
} from "firebase-admin/firestore";
import { interfaceFilme } from "../models/filmes.model";
class FilmesService {

  static async alterOneRecord(data: interfaceFilme) {
    const db = getFirestore();
    try {
      if (data.id) {
        console.log(data);
          await db.collection("filmes").doc(data.id).update({
            date: data.date,
            name: data.name,
            visa: data.visa,
            duration: data.duration,
            lauch: data.lauch,
            note: data.note,
            synopsis: data.synopsis,
            imgUrl: data.img,
          });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("erro ao atualizar um filme: " + error);
    }
  }

  static async getOneRecord(idDoc: string): Promise<DocumentData | undefined> {
    const db = getFirestore();
    try {
      const getData = await db.collection("filmes").doc(idDoc).get();
      return getData.data();
    } catch (error) {
      throw new Error("erro ao recuperar um filme: " + error);
    }
  }

  static async deleteOne(idDoc: string) {
    const db = getFirestore();
    try {
      await db.collection("filmes").doc(idDoc).delete();
    } catch (error) {
      throw new Error("erro ao deletar um filme: " + error);
    }
  }

  static async getAllRecords(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const db = getFirestore();
    try {
      const getData = await db.collection("filmes").get();
      return getData.docs;
    } catch (error) {
      throw new Error("Falha ao obter todos os filmes: " + error);
    }
  }

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