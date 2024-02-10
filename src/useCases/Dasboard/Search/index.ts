import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import {SearchDashboardUseCase} from './Search.ts';
import {SearchDashboarController} from './SearchController.ts';

const mongoDashboardRepository = new MongoDashboardRepository();
const searchDashboardUseCase = new SearchDashboardUseCase(
  mongoDashboardRepository
);
const searchDashboarController = new SearchDashboarController(
    searchDashboardUseCase
);

export { searchDashboardUseCase, searchDashboarController };
