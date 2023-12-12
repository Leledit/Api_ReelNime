import { uuid } from "uuidv4";

export class User{
    public readonly id: string | undefined;
    public email: string = '';
    public password: string = '';

    constructor(props: Omit<User, "id">, id?: string) {
        Object.assign(this,props);
        this.id = id ? id : uuid();
    }
}