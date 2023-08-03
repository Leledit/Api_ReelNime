import {
  DocumentData,
  QueryDocumentSnapshot,
  getFirestore,
} from "firebase-admin/firestore";
class AnimesServices{
    static async getOneRecord(idDoc:string):Promise<DocumentData | undefined> {
      const db = getFirestore();
      try{
        const getData = await db.collection("animes").doc(idDoc).get();
        return getData.data();
      }catch(error){
        throw new Error("erro ao recuperar um anime: " + error);
      }
    }
    static async getAllRecords():Promise<QueryDocumentSnapshot<DocumentData>[]> {
      const db = getFirestore();
      try {
        const getData = await db.collection("animes").get();
        return getData.docs;
      } catch (error) {
        throw new Error("Falha ao obter todos os animes: " + error);
      }
    }
    static async registerData(data:any):Promise<string>{
        const db = getFirestore();
        try{
            const docRef = await db.collection("animes").add(data);
            return docRef.id;
        }catch(error){
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