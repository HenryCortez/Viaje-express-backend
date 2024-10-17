import { Inject, Injectable } from "@nestjs/common";
import { CreateTravelDto } from "../../dto/create-travel.dto";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";

@Injectable()
export class UpdateTravelUseCase {
  constructor(
    @Inject('TravelRepository') private travelRepository: TravelRepositoryPort,
  ) {}

  async execute(id: number, travel: Partial<CreateTravelDto>): Promise<any> {
    const updatedTravel = await this.travelRepository.updateTravel(id, travel);
    return updatedTravel;
  }
}