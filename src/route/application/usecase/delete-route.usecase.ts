import { Inject, Injectable } from "@nestjs/common";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";

@Injectable()
export class DeleteRouteUseCase {
  constructor(
    @Inject('RouteRepository') private routeRepository: RouteRepositoryPort,
  ) {}

  async execute(id: number): Promise<any> {
    const deleted = await this.routeRepository.deleteRoute(id);
    return deleted;
  }
}