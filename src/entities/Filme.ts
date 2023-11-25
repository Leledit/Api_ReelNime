import { uuid } from "uuidv4";

export class Filme {
    public readonly id: string | undefined;
    public name:string = '';
    public visa: boolean = false;
    public duration: string ='';
    public lauch: string= '';
    public note:number =  0;
    public synopsis: string = '';
    public urlImg?: string = '';

    constructor(props: Omit<Filme,"id">, id?: string) {
        //atribuindo os valores passados para a class
        Object.assign(this, props);
        this.id = id ? id : uuid();
      }
}