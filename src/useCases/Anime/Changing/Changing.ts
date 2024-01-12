import { Anime } from "../../../entities/Anime.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./ChangingDTO.ts";

export class ChangingAnimeUseCase {
  constructor(private animesRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
    try {
      const oldAnimeData = await this.animesRepository.listOne(data.id);

      let urlImg = "";

      const linkRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
      if (linkRegex.test(data.img)) {
        urlImg = data.img;
      } else {
        if (oldAnimeData?.urlImg && data.img) {
          //apagando a imagen antiga para dar lugar a nova
          await StorageFirebase.deleteImg(oldAnimeData?.urlImg, "animes/");
        }

        //Adicionando a imagen no storage
        if (data.img) {
          const clearImgBase64 = data.img.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const bufferImg = Buffer.from(clearImgBase64, "base64");

          const urlImgAnime = await StorageFirebase.uploadFile(
            bufferImg,
            data.name,
            "animes/"
          );
          urlImg = urlImgAnime;
        } else {
          if (oldAnimeData?.urlImg) {
            urlImg = oldAnimeData?.urlImg;
          }
        }
      }
      const anime = new Anime(
        {
          name: data.name,
          nextSeason: data.nextSeason,
          note: data.note,
          previousSeason: data.previousSeason,
          qtdEpisodes: data.qtdEpisodes,
          releaseYear: data.releaseYear,
          status: data.status,
          synopsis: data.synopsis,
          watched: data.watched,
          urlImg: urlImg,
        },
        data.id
      );

      await this.animesRepository.changing(anime);
    } catch (err: any) {}
  }
}
