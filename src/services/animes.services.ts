import {
  DocumentData,
  QueryDocumentSnapshot,
  WriteResult,
  getFirestore,
} from "firebase-admin/firestore";
import { interfaceAnimes } from "../models/animes.model";
class AnimesServices {
  static async alterOneRecord(data: interfaceAnimes, newImg: boolean) {
    const db = getFirestore();
    try {
      if (data.id) {
        if (newImg) {
          await db.collection("animes").doc(data.id).update({
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
          });
        } else {
          await db.collection("animes").doc(data.id).update({
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
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("erro ao atualizar um anime: " + error);
    }
  }
  static async deleteOne(idDoc: string) {
    const db = getFirestore();
    try {
      await db.collection("animes").doc(idDoc).delete();
    } catch (error) {
      throw new Error("erro ao deletar um anime: " + error);
    }
  }
  static async getOneRecord(idDoc: string): Promise<DocumentData | undefined> {
    const db = getFirestore();
    try {
      const getData = await db.collection("animes").doc(idDoc).get();
      return getData.data();
    } catch (error) {
      throw new Error("erro ao recuperar um anime: " + error);
    }
  }
  static async getAllRecords(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    const db = getFirestore();
    try {
      const getData = await db.collection("animes").get();
      return getData.docs;
    } catch (error) {
      throw new Error("Falha ao obter todos os animes: " + error);
    }
  }
  static async registerData(data: interfaceAnimes): Promise<string> {
    const db = getFirestore();
    try {
      const docRef = await db.collection("animes").add(data);
      return docRef.id;
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo anime");
    }
  }
  static async checkRecordExistence(identifier: string): Promise<boolean> {
    const db = getFirestore();
    try {
      const resultQuery = await db
        .collection("animes")
        .where("name", "==", identifier)
        .get();
      return resultQuery.empty;
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um anime");
    }
  }
}

export default AnimesServices;
