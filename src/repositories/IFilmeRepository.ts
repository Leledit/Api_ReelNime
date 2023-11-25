import { Filme } from "../entities/Filme";

export interface IFilmeRepository{
    findByName(name: string): Promise<boolean>;
    save(filme: Filme): Promise<void>;
}