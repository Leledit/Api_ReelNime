import { uuid } from "uuidv4";

export class Anime {
  public readonly id: string | undefined;
  public qtdEpisodes: number = 0;
  public releaseYear: number = 0;
  public name: string = '';
  public synopsis: string = '';
  public nextSeason: string = '';
  public previousSeason: string = '';
  public watched: boolean = false;
  public updateDate?: Date = new Date();
  public note: number = 0;
  public status: string ='';
  public genres: string[] = [''];
  public urlImg?: string = '';

  constructor(props: Omit<Anime,"id">, id?: string) {
    //atribuindo os valores passados para a class
    Object.assign(this, props);
    this.id = id ? id : uuid();
  }
}
