import { Inject, Injectable } from "@nestjs/common";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";

@Injectable()
export class ListIncomeUseCase {
  constructor(
    @Inject('TravelRepository') private travelRepository: TravelRepositoryPort,
  ) {}

  async execute(travelId: number): Promise<number> {
    const income = await this.travelRepository.listIncomeByTravel(travelId);
    return income;
  }
}