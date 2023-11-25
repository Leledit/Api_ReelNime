import { Filme } from "../../../entities/Filme.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeRequestDTO } from "./RegisterDTO.ts";
import path from "path";

export class RegisterFilmeUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeRequestDTO) {
    const dataAlreadyRegistered = await this.filmeRepository.findByName(
      data.name
    );

    if (!dataAlreadyRegistered) {
      let urlImgFilme = "";
      if (data.dataImg) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(data.dataImg.originalname);

        urlImgFilme = await StorageFirebase.uploadFile(
          data.dataImg.buffer,
          filename,
          "filmes/"
        );
      }

      const filme = new Filme({
        name: data.name,
        duration: data.duration,
        lauch: data.lauch,
        note: data.note,
        synopsis: data.synopsis,
        visa: data.visa,
        urlImg: urlImgFilme,
      });

      this.filmeRepository.save(filme);

      return true;
    } else {
      return false;
    }
  }
}