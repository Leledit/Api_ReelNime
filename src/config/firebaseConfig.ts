import {initializeApp} from 'firebase-admin/app'
 
export class FirebaseConfig {
  private static initialized = false;

  static initializeConfig(): void {
    if (!FirebaseConfig.initialized) {
      initializeApp();
      FirebaseConfig.initialized = true;
    } 
  }
  // Adicione outros métodos para inicializar outros serviços do Firebase, se necessário
}