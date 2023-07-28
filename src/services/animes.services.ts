import { getFirestore } from "firebase-admin/firestore";

class AnimesServices{
    static async registerData(data:any):Promise<string>{
        const db = getFirestore();
        try{
            const docRef = await db.collection("animes").add(data);
            return docRef.id;
        }catch(error){
            throw new Error("Falha ao cadastrar um novo anime");
        }
    }
}

export default AnimesServices;