import { Router } from "express";
import { registerGenreController } from "./useCases/Genre/Register/index.ts";
import { listAllGenresController } from "./useCases/Genre/ListAll/index.ts";
import { listOneGenreController } from "./useCases/Genre/ListOne/index.ts";
import { changingGenerController } from "./useCases/Genre/Changing/index.ts";
import { deleteGenreController } from "./useCases/Genre/Delete/index.ts";
import { registerAnimeController } from "./useCases/Anime/Register/index.ts";
import { listOneAnimesController } from "./useCases/Anime/ListOne/index.ts";
import { listAllAnimesController } from "./useCases/Anime/ListAll/index.ts";
import { deleteAnimeController } from "./useCases/Anime/Delete/index.ts";
import { paginationAnimeController } from "./useCases/Anime/Pagination/index.ts";
import { changingAnimeControler } from "./useCases/Anime/Changing/index.ts";
import { registerFilmeController } from "./useCases/Filme/Register/index.ts";
import { changingFilmeController } from "./useCases/Filme/Changing/index.ts";
import { listOneFilmesController } from "./useCases/Filme/ListOne/index.ts";
import { listAllFilmeController } from "./useCases/Filme/ListAll/index.ts";
import { paginationFilmeController } from "./useCases/Filme/Pagination/index.ts";
import { deleteFilmeController } from "./useCases/Filme/Delete/index.ts";
import { searchGenreController } from "./useCases/Genre/Search/index.ts";
import { singleFileUpload } from "./providers/MulterImage.ts";
import { releasesController } from "./useCases/Dasboard/Releases/index.ts";
import { recentlyAddedController } from "./useCases/Dasboard/RecentlyAdded/index.ts";
import { popularController } from "./useCases/Dasboard/Popular/index.ts";
import { animeFindByNameGenreController } from "./useCases/Anime/Genres/findByName/index.ts";
import { filmeFindByNameGenreController } from "./useCases/Filme/Genres/findByName/index.ts";
import { litByYearAnimeController } from "./useCases/Anime/LitByYear/index.ts";
import { litByYearFilmeController } from "./useCases/Filme/LitByYear/index.ts";
const router = Router();

//Routes related to the "genre" segment

router.post(
  "/genres/",
  registerGenreController.validateRequest,
  (request, response) => {
    return registerGenreController.handle(request, response);
  }
);

router.get("/genres/", (request, response) => {
  return listAllGenresController.handle(request, response);
});

router.get(
  "/genres/search",
  searchGenreController.validateRequest,
  (request, response) => {
    return searchGenreController.handle(request, response);
  }
);

router.get(
  "/genres/:id",
  listOneGenreController.validateRequest,
  (request, response) => {
    return listOneGenreController.handle(request, response);
  }
);

router.put("/genres/:id", (request, response) => {
  return changingGenerController.handle(request, response);
});

router.delete(
  "/genres/:id",
  deleteGenreController.validateRequest,
  (request, response) => {
    return deleteGenreController.handle(request, response);
  }
);

//Routes related to the "anime" segment

router.post(
  "/animes/",
  singleFileUpload("img"),
  registerAnimeController.validateRequest,
  (request, response) => {
    return registerAnimeController.handle(request, response);
  }
);

router.put(
  "/animes/:id",
  singleFileUpload("img"),
  changingAnimeControler.validateRequest,
  (request, response) => {
    return changingAnimeControler.handle(request, response);
  }
);

router.get(
  "/animes/genres/",
  animeFindByNameGenreController.validateRequest,
  (request, response) => {
    animeFindByNameGenreController.handle(request, response);
  }
);

router.get(
  "/animes/page/",
  paginationAnimeController.validateRequest,
  (request, response) => {
    return paginationAnimeController.handle(request, response);
  }
);

router.get(
  "/animes/year/",
  litByYearAnimeController.validateRequest,
  (request, response) => {
    return litByYearAnimeController.handle(request, response);
  }
);

router.get(
  "/animes/:id",
  listOneAnimesController.validateRequest,
  (request, response) => {
    return listOneAnimesController.handle(request, response);
  }
);

router.get("/animes/", (request, response) => {
  return listAllAnimesController.handle(request, response);
});

router.delete("/animes/:id", (request, response) => {
  return deleteAnimeController.handle(request, response);
});

//Routes related to the "films" segment

router.post(
  "/filmes/",
  singleFileUpload("img"),
  registerFilmeController.validateRequest,
  (request, response) => {
    return registerFilmeController.handle(request, response);
  }
);

router.get(
  "/filmes/year/",
  litByYearFilmeController.validateRequest,
  (request, response) => {
    return litByYearFilmeController.handle(request, response);
  }
);

router.put(
  "/filmes/:id",
  singleFileUpload("img"),
  changingFilmeController.validateRequest,
  (request, response) => {
    return changingFilmeController.handle(request, response);
  }
);

router.get(
  "/filmes/genres/",
  filmeFindByNameGenreController.validateRequest,
  (request, response) => {
    filmeFindByNameGenreController.handle(request, response);
  }
);

router.get(
  "/filmes/page/",
  paginationFilmeController.validateRequest,
  (request, response) => {
    return paginationFilmeController.handle(request, response);
  }
);

router.get(
  "/filmes/:id",
  listOneFilmesController.validateRequest,
  (request, response) => {
    return listOneFilmesController.handle(request, response);
  }
);

router.get("/filmes/", (request, response) => {
  return listAllFilmeController.handle(request, response);
});

router.delete(
  "/filmes/:id",
  deleteFilmeController.validateRequest,
  (request, response) => {
    return deleteFilmeController.handle(request, response);
  }
);

//

router.get("/dashboard/releases/", (request, response) => {
  return releasesController.handle(request, response);
});

router.get("/dashboard/recentylAdded/", (request, response) => {
  return recentlyAddedController.handle(request, response);
});

router.get("/dashboard/popular/", (request, response) => {
  return popularController.handle(request, response);
});

export { router };
