import { Inject, Injectable } from "@nestjs/common";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";
import { CreateRouteDto } from "../dto/create-route.dto";

@Injectable()
export class CreateRouteUseCase {
  constructor(
    @Inject('RouteRepository') private routeRepository: RouteRepositoryPort,
  ) {}

  async execute(route: CreateRouteDto): Promise<any> {
    const createdRoute = await this.routeRepository.createRoute( route);
    return createdRoute;
  }
}