import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeRequestDTO } from "./DeleteDTO.ts";

export class DeleteFilmeUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeRequestDTO) {
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
