import { uuid } from "uuidv4";

export class User{
    public readonly id: string | undefined;
    public email: string = '';
    public name: string = '';
    public password: string = '';
    public type?: string = 'user';

    constructor(props: Omit<User, "id">, id?: string) {
        Object.assign(this,props);
        this.id = id ? id : uuid();
    }
}