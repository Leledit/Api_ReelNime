import { initializeApp, cert } from 'firebase-admin/app';
import { createRequire } from 'module';

const require = createRequire(import.meta.url)

export class FirebaseConfig {
  private static app: any;

  static async initializeConfig(): Promise<void> {
    const serviceAccount = require("../../key.json")
    
    if (!FirebaseConfig.app) {
      FirebaseConfig.app = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: 'site-de-animes.appspot.com'
      });
    }
  }
}