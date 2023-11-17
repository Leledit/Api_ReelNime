import { Router } from "express";
import { registerGenreController } from "./useCases/Genre/Register/index.ts";
import { listAllGenresController } from "./useCases/Genre/ListAll/index.ts";
import { listOneGenreController } from "./useCases/Genre/listOne/index.ts";

const router = Router();

router.get("/api/v1/", (request, response) => {
  return response.status(201).send();
});

router.post("/api/v1/genres/", (request, response) => {
  return registerGenreController.handle(request, response);
});

router.get("/api/v1/genres/", (request, response) => {
  return listAllGenresController.handle(request, response);
});

router.get("/api/v1/genres/search", (request, response) => {
  return listOneGenreController.handle(request, response);
});
export { router };
