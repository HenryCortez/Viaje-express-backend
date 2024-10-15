import { Inject, Injectable } from "@nestjs/common";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";

@Injectable()
export class ListCitiesUseCase {
  constructor(
    @Inject('RouteRepository') private routeRepository: RouteRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const listedCities = await this.routeRepository.listCities();
    return listedCities;
  }
}