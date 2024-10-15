import { Inject, Injectable } from "@nestjs/common";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";

@Injectable()
export class ListRoutesUseCase {
  constructor(
    @Inject('RouteRepository') private routeRepository: RouteRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const listedRoutes = await this.routeRepository.listRoutes();
    return listedRoutes;
  }
}