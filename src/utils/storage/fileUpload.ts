import { getStorage  } from "firebase-admin/storage";

export class FileUpload{
    static async uploadFile(imageBuffer:Buffer, fileName:string){
        try{
            const storage = getStorage();
            const bucket = storage.bucket();
            const file = bucket.file('animes/'+fileName);
            await file.save(imageBuffer);
            await file.makePublic();
            const downloadURL = await file.getSignedUrl({
                action: "read",
                expires: "01-01-2099", // Defina uma data de expiração desejada
            });
            return downloadURL[0];
        }catch(error){
            console.error("Erro ao fazer upload da imagem:", error);
            throw error
        }
    }
}