import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/infraestructure/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/infraestructure/guards/auth.guard';
import { RolesGuard } from 'src/auth/infraestructure/guards/roles.guard';
import { CreateDriverDto } from 'src/driver/application/dto/create-driver-dto';
import { CreateDriverUseCase } from 'src/driver/application/usecases/create-driver.usecase';
import { DeleteDriverUseCase } from 'src/driver/application/usecases/delete-driver.usecase';
import { ListDriverUseCase } from 'src/driver/application/usecases/list-drivers.usecase';

@Controller('drivers/')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class DriverController {
  constructor(
    private readonly createDriverrUsecase: CreateDriverUseCase,
    private readonly deleteDriverUsecase: DeleteDriverUseCase,
    private readonly listDriversUsecase: ListDriverUseCase,
  ) {}

  @Post()
  async createDriver(@Res() request, @Body() driver: CreateDriverDto): Promise<any> {
     const createdDriver = await this.createDriverrUsecase.execute(driver);
     return request.status(HttpStatus.CREATED).json(createdDriver);
    }

    @Get()
    async listUsers(@Res() request): Promise<any> {
      const drivers = await this.listDriversUsecase.execute();
      return request.status(HttpStatus.OK).json(drivers);
    }

    @Delete(':id')
    async deleteDriver(@Res() request, @Param('id', ParseIntPipe) id: number): Promise<any> {
      const deleted = await this.deleteDriverUsecase.execute(id);
      return request.status(HttpStatus.NO_CONTENT).json(deleted);
    }
}
