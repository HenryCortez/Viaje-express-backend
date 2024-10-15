import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/infraestructure/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/infraestructure/guards/auth.guard';
import { RolesGuard } from 'src/auth/infraestructure/guards/roles.guard';
import { CreateRouteDto } from 'src/route/application/dto/create-route.dto';
import { CreateRouteUseCase } from 'src/route/application/usecase/create-route.usecase';
import { DeleteRouteUseCase } from 'src/route/application/usecase/delete-route.usecase';
import { ListCitiesUseCase } from 'src/route/application/usecase/list-cities.usecase';
import { ListRoutesUseCase } from 'src/route/application/usecase/list-routes.usecase';
import { UpdateRouteUseCase } from 'src/route/application/usecase/update-route.usecase';

@Controller('route')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class RouteController {
  constructor(
    private readonly createRouteUseCase: CreateRouteUseCase,
    private readonly updateRouteUseCase: UpdateRouteUseCase,
    private readonly deleteRouteUseCase: DeleteRouteUseCase,
    private readonly listRoutesUseCase: ListRoutesUseCase,
    private readonly listCitiesUseCase: ListCitiesUseCase,
  ) {}

  @Post()
  async createRoute(
    @Res() request,
    @Body() route: CreateRouteDto,
  ): Promise<any> {
    const createdRoute = await this.createRouteUseCase.execute(route);
    return request.status(HttpStatus.CREATED).json(createdRoute);
  }

    @Get()
    async listRoutes(@Res() request): Promise<any> {
        const routes = await this.listRoutesUseCase.execute();
        return request.status(HttpStatus.OK).json(routes);
    }

    @Get('/cities')
    async listCities(@Res() request): Promise<any> {
        const cities = await this.listCitiesUseCase.execute();
        return request.status(HttpStatus.OK).json(cities);
    }

    @Patch(':id')
    async updateRoute(
        @Res() request,
        @Body() route: CreateRouteDto,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        const updatedRoute = await this.updateRouteUseCase.execute(id, route);
        return request.status(HttpStatus.OK).json(updatedRoute);
    }

    @Delete(':id')
    async deleteRoute(
        @Res() request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        await this.deleteRouteUseCase.execute(id);
        return request.status(HttpStatus.NO_CONTENT).json();
    }
}
