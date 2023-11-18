import { Genre } from "../entities/Genre";

export interface IGenreRepository{
    save(genre:Genre):Promise<void>;
    findByName(genre:Genre):Promise<Genre>
    findAll():Promise<Genre[]>
    changing(genre:Genre):Promise<void>;
}