import { Genre } from "../entities/Genre";

export interface IGenreRepository{
    save(genre:Genre):Promise<void>;
}