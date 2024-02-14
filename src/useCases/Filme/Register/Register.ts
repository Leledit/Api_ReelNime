import { Filme } from "../../../entities/Filme.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeRegisterDTO } from "./RegisterDTO.ts";

export class FilmeRegisterUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeRegisterDTO) {
    const dataAlreadyRegistered = await this.filmeRepository.findByName(
      data.name
    );

    if (!dataAlreadyRegistered) {
      let urlImgFilme = "";

      const clearImgBase64 = data.img.replace(/^data:image\/\w+;base64,/, "");
      const bufferImg = Buffer.from(clearImgBase64, "base64");

      if (data.img) {
        urlImgFilme = await StorageFirebase.uploadFile(
          bufferImg,
          data.name,
          "filmes/"
        );
      }

      const filme = new Filme({
        name: data.name,
        duration: data.duration,
        releaseYear: data.releaseYear,
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
