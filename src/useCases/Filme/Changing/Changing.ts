import { Filme } from "../../../entities/Filme.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeChangingDTO } from "./ChangingDTO.ts";

export class FilmeChangingUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeChangingDTO) {
    try {
      
      let urlImg = "";
      const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

      const oldFilmeData = await this.filmeRepository.listOne(data.id);

      if (linkRegex.test(data.img)) {
        urlImg = data.img;
      }else{
        if (oldFilmeData?.urlImg && data.img) {
          //apagando a imagen antiga para dar lugar a nova
          await StorageFirebase.deleteImg(oldFilmeData?.urlImg, "filmes/");
        }

        if(data.img){
          const clearImgBase64 = data.img.replace(
            /^data:image\/\w+;base64,/,
            ""
          );

          const bufferImg = Buffer.from(clearImgBase64, "base64");
          
          const urlImgAnime = await StorageFirebase.uploadFile(
            bufferImg,
            data.name,
            "filmes/"
          );
          urlImg = urlImgAnime;
        }else {
          if (oldFilmeData?.urlImg) {
            urlImg = oldFilmeData?.urlImg;
          }
        }
      }

      const filme = new Filme(
        {
          duration: data.duration,
          name: data.name,
          note: data.note,
          releaseYear: data.releaseYear,
          synopsis: data.synopsis,
          visa: data.visa,
          genres: data.genres,
          urlImg: urlImg,
        },
        data.id
      );

      await this.filmeRepository.changing(filme);
    } catch (err: any) {
      console.log("---");
      console.log(err);
    }
  }
}
