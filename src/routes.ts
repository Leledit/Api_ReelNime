import { Router } from "express";
import { registerGenreController } from "./useCases/Genre/RegisterGenre/index.ts";

const router = Router();

router.get("/api/v1/", (request, response) => {
  return response.status(201).send();
});

router.post("/api/v1/genres/",(request, response) => {
  return registerGenreController.handle(request,response)
});

export { router };
