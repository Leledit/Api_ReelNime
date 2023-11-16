import { uuid } from "uuidv4";

export class Genre {
  public readonly id?: string | undefined;
  public name: string = "";
  public registrationDate?: Date = new Date();

  constructor(props: Omit<Genre,'id'> ,id?: string) {
    Object.assign(this,props);
    this.id = id ? id : uuid();
  }
}
