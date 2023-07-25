import { InterfacePostGenres } from "../models/genres.model";
import { getFirestore } from "firebase-admin/firestore";
class GenresServices {
  static async registerData(data: InterfacePostGenres): Promise<string> {
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
        const resultQuery = await db.collection("genres").where('nameGenre','==',identifier).get();
        return resultQuery.empty;
    } catch (error) {
        throw new Error("Falha ao validar a existencia de um genero");
    }
  }
}
export default GenresServices;
