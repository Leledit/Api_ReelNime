import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { LitByYearDTO } from "./LitByYearDTO.ts";

export class LitByYearFilmeUseCase{
    constructor(private filmeRepository: IFilmeRepository) {}
    async execute(data: LitByYearDTO) {
        const result = await this.filmeRepository.findByYear(data.year);

        return result;
    }
}