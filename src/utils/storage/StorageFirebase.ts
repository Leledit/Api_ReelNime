import { getStorage } from "firebase-admin/storage";

export class StorageFirebase {
  static async uploadFile(imageBuffer: Buffer, fileName: string) {
    try {
      const storage = getStorage();
      const bucket = storage.bucket();
      const file = bucket.file("animes/" + fileName);
      await file.save(imageBuffer);
      await file.makePublic();
      const downloadURL = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2099", // Defina uma data de expiração desejada
      });
      return downloadURL[0];
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw error;
    }
  }
  static async deleteImg(nameImg: string) {
    try {
      //Intanciando uma instancia de storage
      const storage = getStorage();

      await storage.bucket().file(`animes/${nameImg}`).delete();
      return true;
    } catch (error) {
      console.error("Erro ao deletar a image:", error);
      return false;
      //throw error;
    }
  }
}
