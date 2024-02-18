import { Router, request, response } from "express";

import { generChangingController } from "./useCases/Genre/Changing/index.ts";
import { generDeleteController } from "./useCases/Genre/Delete/index.ts";
import { generListAllController } from "./useCases/Genre/ListAll/index.ts";
import { generListOnelController } from "./useCases/Genre/ListOne/index.ts";
import { generRegisterController } from "./useCases/Genre/Register/index.ts";
import { generSearchController } from "./useCases/Genre/Search/index.ts";

import { animeChangingControler } from "./useCases/Anime/Changing/index.ts";
import { animeListOneController } from "./useCases/Anime/ListOne/index.ts";
import { animeDeleteController } from "./useCases/Anime/Delete/index.ts";
import { animeFindByNameGenreController } from "./useCases/Anime/Genres/findByName/index.ts";
import { animeListByYearController } from "./useCases/Anime/ListByYear/index.ts";
import { animeGenresAddController } from "./useCases/Anime/Genres/Add/index.ts";
import { animeGenresDeleteController } from "./useCases/Anime/Genres/Delete/index.ts";
import { animeListAllController } from "./useCases/Anime/ListAll/index.ts";
import { animePaginationController } from "./useCases/Anime/Pagination/index.ts";
import { animeRegisterController } from "./useCases/Anime/Register/index.ts";

import { filmeChangingController } from "./useCases/Filme/Changing/index.ts";
import { filmeDeleteController } from "./useCases/Filme/Delete/index.ts";
import { filmeGenresAddController } from "./useCases/Filme/Genres/Add/index.ts";
import { filmeGenresDeleteController } from "./useCases/Filme/Genres/Delete/index.ts";
import { filmeGenreFindByNameController } from "./useCases/Filme/Genres/FindByName/index.ts";
import { filmeListAllController } from "./useCases/Filme/ListAll/index.ts";
import { filmeLitByYearController } from "./useCases/Filme/ListByYear/index.ts";
import { filmeListOneController } from "./useCases/Filme/ListOne/index.ts";
import { filmePaginationController } from "./useCases/Filme/Pagination/index.ts";
import { filmeRegisterController } from "./useCases/Filme/Register/index.ts";

import { dasboardItemController } from "./useCases/Dasboard/Item/index.ts";
import { dashboardListByGenreController } from "./useCases/Dasboard/ListByGenre/index.ts";
import { dasboardListByYearController } from "./useCases/Dasboard/ListByYear/index.ts";
import { dasboardPopularController } from "./useCases/Dasboard/Popular/index.ts";
import { dasboardRecentlyAddedController } from "./useCases/Dasboard/RecentlyAdded/index.ts";
import { dashboardReleasesController } from "./useCases/Dasboard/Releases/index.ts";
import { dashboardSearchController } from "./useCases/Dasboard/Search/index.ts";

import { userRegisterController } from "./useCases/User/Register/index.ts";
import { userLoginController } from "./useCases/User/Login/index.ts";
import { userListController } from "./useCases/User/List/index.ts";

import authenticateToken from "./middleware/authMiddleware.ts";


const router = Router();

router.post(
  "/genres/",
  authenticateToken,
  generRegisterController.validateRequest,
  (request, response) => {
    return generRegisterController.handle(request, response);
  }
);

router.get("/genres/", (request, response) => {
  return generListAllController.handle(request, response);
});

router.get(
  "/genres/search",
  generSearchController.validateRequest,
  (request, response) => {
    return generSearchController.handle(request, response);
  }
);

router.get(
  "/genres/:id",
  generListOnelController.validateRequest,
  (request, response) => {
    return generListOnelController.handle(request, response);
  }
);

router.put("/genres/:id", authenticateToken, (request, response) => {
  return generChangingController.handle(request, response);
});

router.delete(
  "/genres/:id",
  authenticateToken,
  generDeleteController.validateRequest,
  (request, response) => {
    return generDeleteController.handle(request, response);
  }
);

//Routes related to the "anime" segment

router.post(
  "/animes/",
  authenticateToken,
  animeRegisterController.validateRequest,
  (request, response) => {
    return animeRegisterController.handle(request, response);
  }
);

router.put(
  "/animes/:id",
  authenticateToken,
  animeChangingControler.validateRequest,
  (request, response) => {
    return animeChangingControler.handle(request, response);
  }
);

router.post(
  "/animes/genres/add/",
  authenticateToken,
  animeGenresAddController.validateRequest,
  (request, response) => {
    animeGenresAddController.handle(request, response);
  }
);

router.delete(
  "/animes/genres/delete/",
  authenticateToken,
  animeGenresDeleteController.validateRequest,
  (request, response) => {
    animeGenresDeleteController.handle(request, response);
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
  animePaginationController.validateRequest,
  (request, response) => {
    return animePaginationController.handle(request, response);
  }
);

router.get(
  "/animes/year/",
  animeListByYearController.validateRequest,
  (request, response) => {
    return animeListByYearController.handle(request, response);
  }
);

router.get(
  "/animes/:id",
  animeListOneController.validateRequest,
  (request, response) => {
    return animeListOneController.handle(request, response);
  }
);

router.get("/animes/", (request, response) => {
  return animeListAllController.handle(request, response);
});

router.delete("/animes/:id", authenticateToken, (request, response) => {
  return animeDeleteController.handle(request, response);
});

//Routes related to the "films" segment

router.post(
  "/filmes/",
  authenticateToken,
  filmeRegisterController.validateRequest,
  (request, response) => {
    return filmeRegisterController.handle(request, response);
  }
);

router.post(
  "/filmes/genres/add/",
  authenticateToken,
  filmeGenresAddController.validateRequest,
  (request, response) => {
    filmeGenresAddController.handle(request, response);
  }
);

router.delete(
  "/filmes/genres/delete/",
  authenticateToken,
  filmeGenresDeleteController.validateRequest,
  (request, response) => {
    filmeGenresDeleteController.handle(request, response);
  }
);

router.get(
  "/filmes/year/",
  filmeLitByYearController.validateRequest,
  (request, response) => {
    return filmeLitByYearController.handle(request, response);
  }
);

router.put(
  "/filmes/:id",
  authenticateToken,
  filmeChangingController.validateRequest,
  (request, response) => {
    return filmeChangingController.handle(request, response);
  }
);

router.get(
  "/filmes/genres/",
  filmeGenreFindByNameController.validateRequest,
  (request, response) => {
    filmeGenreFindByNameController.handle(request, response);
  }
);

router.get(
  "/filmes/page/",
  filmePaginationController.validateRequest,
  (request, response) => {
    return filmePaginationController.handle(request, response);
  }
);

router.get(
  "/filmes/:id",
  filmeListOneController.validateRequest,
  (request, response) => {
    return filmeListOneController.handle(request, response);
  }
);

router.get("/filmes/", (request, response) => {
  return filmeListAllController.handle(request, response);
});

router.delete(
  "/filmes/:id",
  authenticateToken,
  filmeDeleteController.validateRequest,
  (request, response) => {
    return filmeDeleteController.handle(request, response);
  }
);

router.get("/dashboard/releases/", (request, response) => {
  return dashboardReleasesController.handle(request, response);
});

router.get("/dashboard/recentylAdded/", (request, response) => {
  return dasboardRecentlyAddedController.handle(request, response);
});

router.get(
  "/dashboard/popular/",
  dasboardPopularController.validateRequest,
  (request, response) => {
    return dasboardPopularController.handle(request, response);
  }
);

router.get(
  "/dashboard/year/",
  dasboardListByYearController.validateRequest,
  (request, response) => {
    return dasboardListByYearController.handle(request, response);
  }
);

router.get(
  "/dashboard/search",
  dashboardSearchController.validateRequest,
  (request, response) => {
    return dashboardSearchController.handle(request, response);
  }
);

router.get(
  "/dashboard/item",
  dasboardItemController.validateRequest,
  (request, response) => {
    return dasboardItemController.handle(request, response);
  }
);

router.get(
  "/dashboard/genre",
  dashboardListByGenreController.validateRequest,
  (request, response) => {
    return dashboardListByGenreController.handle(request, response);
  }
);

router.post(
  "/user/register/",
  userRegisterController.validateRequest,
  (request, response) => {
    return userRegisterController.handle(request, response);
  }
);

router.post(
  "/user/login/",
  userLoginController.validateRequest,
  (request, response) => {
    return userLoginController.handle(request, response);
  }
);

router.get(
  "/user/list/",
  userListController.validateRequest,
  (request, response) => {
    return userListController.handle(request, response);
  }
);

export { router };
