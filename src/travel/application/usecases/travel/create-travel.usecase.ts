import { Inject, Injectable } from "@nestjs/common";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";
import { CreateTravelDto } from "../../dto/create-travel.dto";

@Injectable()
export class CreateTravelUseCase {
  constructor(
    @Inject('TravelRepository') private travelRepository: TravelRepositoryPort,
  ) {}

  async execute(travel: CreateTravelDto): Promise<any> {
    const createdTravel = await this.travelRepository.createTravel(travel);
    return createdTravel;
  }
}