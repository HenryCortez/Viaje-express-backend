import { Inject, Injectable } from "@nestjs/common";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";

@Injectable()
export class ListAllTravelsUseCase {
  constructor(
    @Inject('TravelRepository') private travelRepository: TravelRepositoryPort,
  ) {}

  async execute(): Promise<any[]> {
    const listedTravels = await this.travelRepository.listAllTravels();
    return listedTravels;
  }
}