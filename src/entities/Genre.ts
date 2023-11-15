import { uuid } from "uuidv4";

export class Genre {
  public readonly id: string | undefined;
  public name: string = "";
  public registrationDate?: Date = new Date();

  constructor(props:Genre, id?: string) {

    this.id = id ? id : uuid();
  }
}
