import { Genre } from "../entities/Genre.ts";

export interface IGenreRepository {
  save(genre: Genre): Promise<void>;
  findByName(genre: Genre): Promise<Genre>;
  findAll(): Promise<Genre[]>;
  changing(genre: Genre): Promise<void>;
  delete(idGenre: string): Promise<void>;
  listOne(id: string): Promise<Genre | null>;
  query(query:string): Promise<Genre[]>;
}
