import { Anime } from "../entities/Anime";

export interface IAnimeRepository{
    save(anime:Anime):Promise<void>
}