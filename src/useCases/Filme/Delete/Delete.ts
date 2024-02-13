import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeDeleteSchemeDTO } from "./DeleteDTO.ts";

export class FilmeDeleteUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeDeleteSchemeDTO) {
    try {
      const dataAnime = await this.filmeRepository.listOne(data.id);

      if (dataAnime === null) {
        throw new Error("Filme não encontrado");
      }

      if (dataAnime.urlImg) {
        await StorageFirebase.deleteImg(dataAnime.urlImg, "filmes/");
      }

      await this.filmeRepository.delete(data.id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
