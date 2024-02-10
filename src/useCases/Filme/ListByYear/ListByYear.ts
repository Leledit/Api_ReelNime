import { IFilmeRepository } from "../../../repositories/IFilmeRepository.js";
import { LitByYearDTO } from "./ListByYearDTO.js";

export class LitByYearFilmeUseCase{
    constructor(private filmeRepository: IFilmeRepository) {}
    async execute(data: LitByYearDTO) {
        const result = await this.filmeRepository.findByYear(data.year);

        return result;
    }
}