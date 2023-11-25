import { Router, request, response } from "express";
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

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Routes related to the "genre" segment

router.post("/api/v1/genres/", (request, response) => {
  return registerGenreController.handle(request, response);
});

router.get("/api/v1/genres/", (request, response) => {
  return listAllGenresController.handle(request, response);
});

router.get("/api/v1/genres/search", (request, response) => {
  return listOneGenreController.handle(request, response);
});

router.put("/api/v1/genres/:id", (request, response) => {
  return changingGenerController.handle(request, response);
});

router.delete("/api/v1/genres/:id", (request, response) => {
  return deleteGenreController.handle(request, response);
});

//Routes related to the "anime" segment

router.post("/api/v1/animes/", upload.single("img"), (request, response) => {
  return registerAnimeController.handle(request, response);
});

router.put("/api/v1/animes/", upload.single("img"), (request, response) => {
  return changingAnimeControler.handle(request, response);
});

router.get("/api/v1/animes/page/", (request, response) => {
  return paginationAnimeController.handle(request, response);
});

router.get("/api/v1/animes/:id", (request, response) => {
  return listOneAnimesController.handle(request, response);
});

router.get("/api/v1/animes/", (request, response) => {
  return listAllAnimesController.handle(request, response);
});

router.delete("/api/v1/animes/:id", (request, response) => {
  return deleteAnimeController.handle(request, response);
});

//Routes related to the "films" segment

router.post("/api/v1/filmes/", upload.single("img"), (request, response) => {
  return registerFilmeController.handle(request, response);
});

router.put("/api/v1/filmes/", upload.single("img"), (request, response) => {
  return changingFilmeController.handle(request, response);
});

router.get("/api/v1/filmes/:id", (request, response) => {
  return listOneFilmesController.handle(request, response);
});

export { router };
