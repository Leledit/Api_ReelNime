import { Router } from "express";
import { registerGenreController } from "./useCases/Genre/Register/index.ts";
import { listAllGenresController } from "./useCases/Genre/ListAll/index.ts";
import { listOneGenreController } from "./useCases/Genre/ListOne/index.ts";
import { changingGenerController } from "./useCases/Genre/Changing/index.ts";
import { deleteGenreController } from "./useCases/Genre/Delete/index.ts";
import { registerAnimeController } from "./useCases/Anime/Register/index.ts";
import multer from "multer";
import { listOneAnimesController } from "./useCases/Anime/ListOne/index.ts";
import { listAllAnimesController } from "./useCases/Anime/ListAll/index.ts";
import { deleteAnimeController } from "./useCases/Anime/Delete/index.ts";
import { paginationAnimeController } from "./useCases/Anime/Pagination/index.ts";
import { changingAnimeControler } from "./useCases/Anime/Changing/index.ts";
import { registerFilmeController } from "./useCases/Filme/Register/index.ts";
import { changingFilmeController } from "./useCases/Filme/Changing/index.ts";
import { listOneFilmesController } from "./useCases/Filme/ListOne/index.ts";
import { listAllFilmeController } from "./useCases/Filme/ListAll/index.ts";
import { PaginationFilmeController } from "./useCases/Filme/Pagination/PaginationController.ts";
import { paginationFilmeController } from "./useCases/Filme/Pagination/index.ts";
import { deleteFilmeController } from "./useCases/Filme/Delete/index.ts";
import { searchGenreController } from "./useCases/Genre/Search/index.ts";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.post("/animes/", upload.single("img"), (request, response) => {
  return registerAnimeController.handle(request, response);
});

router.put("/animes/", upload.single("img"), (request, response) => {
  return changingAnimeControler.handle(request, response);
});

router.get("/animes/page/", (request, response) => {
  return paginationAnimeController.handle(request, response);
});

router.get("/animes/:id", (request, response) => {
  return listOneAnimesController.handle(request, response);
});

router.get("/animes/", (request, response) => {
  return listAllAnimesController.handle(request, response);
});

router.delete("/animes/:id", (request, response) => {
  return deleteAnimeController.handle(request, response);
});

//Routes related to the "films" segment

router.post("/filmes/", upload.single("img"), (request, response) => {
  return registerFilmeController.handle(request, response);
});

router.put("/filmes/", upload.single("img"), (request, response) => {
  return changingFilmeController.handle(request, response);
});

router.get("/filmes/page/", (request, response) => {
  return paginationFilmeController.handle(request, response);
});

router.get("/filmes/:id", (request, response) => {
  return listOneFilmesController.handle(request, response);
});

router.get("/filmes/", (request, response) => {
  return listAllFilmeController.handle(request, response);
});

router.delete("/filmes/:id", (request, response) => {
  return deleteFilmeController.handle(request, response);
});

export { router };
