import { fileURLToPath } from 'url';
import path,{ dirname } from 'path';

class Utils {
  static returnCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }
  static returnApplicationPath(pathNecessary:string){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.join(__dirname,pathNecessary)
  }
}

export default Utils;