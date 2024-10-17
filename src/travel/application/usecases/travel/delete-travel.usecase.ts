import { Inject, Injectable } from "@nestjs/common";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";

@Injectable()
export class DeleteTravelUseCase {
  constructor(
    @Inject('TravelRepository') private travelRepository: TravelRepositoryPort,
  ) {}

  async execute(id: number, ): Promise<any> {
    const deletedTravel = await this.travelRepository.deleteTravel(id);
    return deletedTravel;
  }
}