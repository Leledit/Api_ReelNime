import multer from "multer";

export class MulterConfig {
  static getConfig() {
    return multer(); // Aqui você pode adicionar as configurações específicas, se necessário
  }
}