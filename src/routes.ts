import { Router } from "express";
import { registerGenreController } from "./useCases/Genre/Register/index.ts";
import { listAllGenresController } from "./useCases/Genre/ListAll/index.ts";
import { listOneGenreController } from "./useCases/Genre/ListOne/index.ts";
import { changingGenerController } from "./useCases/Genre/Changing/index.ts";
import { deleteGenreController } from "./useCases/Genre/Delete/index.ts";

const router = Router();

//Routes related to the "genre" segment

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

router.put("/api/v1/genres/:id", (request, response) => {
  return changingGenerController.handle(request, response);
});

router.delete("/api/v1/genres/:id",(request, response) => {
  return deleteGenreController.handle(request, response);
})

//Routes related to the "anime" segment


//Routes related to the "films" segment

export { router };
