import { Inject, Injectable } from "@nestjs/common";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";
import { CreateRouteDto } from "../dto/create-route.dto";

@Injectable()
export class UpdateRouteUseCase {
  constructor(
    @Inject('RouteRepository') private routeRepository: RouteRepositoryPort,
  ) {}

  async execute(id: number, route: CreateRouteDto): Promise<any> {
    const updatedRoute = await this.routeRepository.updateRoute(id, route);
    return updatedRoute;
  }
}