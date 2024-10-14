import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/infraestructure/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/infraestructure/guards/auth.guard';
import { RolesGuard } from 'src/auth/infraestructure/guards/roles.guard';
import { CreateVehicleDto } from 'src/vehicle/application/dto/create-vehicle.dto';
import { CreateVehicleUseCase } from 'src/vehicle/application/usecases/create-vehicle.usecase';
import { DeleteVehicleUseCase } from 'src/vehicle/application/usecases/delete-vehicle.usecase';
import { ListAvailableUseCase } from 'src/vehicle/application/usecases/list-available.usecase';
import { ListVehicleTypesUseCase } from 'src/vehicle/application/usecases/list-vehicle-types.usecase';
import { ListVehicleUseCase } from 'src/vehicle/application/usecases/list-vehicles.usecase';
import { UpdateVehicleUseCase } from 'src/vehicle/application/usecases/update-vehicle.usecase';

@Controller('vehicles/')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class VehicleController {
  constructor(
    private readonly createVehicleUsecase: CreateVehicleUseCase,
    private readonly deleteVehicleUsecase: DeleteVehicleUseCase,
    private readonly listAvailableUsecase: ListAvailableUseCase,
    private readonly listVehicleTypesUsecase: ListVehicleTypesUseCase,
    private readonly listVehicleUsecase: ListVehicleUseCase,
    private readonly updateVehicleUsecase: UpdateVehicleUseCase,
  ) {}

  @Post()
  async createVehicle(
    @Res() request,
    @Body() vehicle: CreateVehicleDto,
  ): Promise<any> {
    const createdVehicle = await this.createVehicleUsecase.execute(vehicle);
    return request.status(HttpStatus.CREATED).json(createdVehicle);
  }

  @Get()
  async listVehicles(@Res() request): Promise<any> {
    const vehicles = await this.listVehicleUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicles);
  }

  @Get('/available')
  async listAvailable(@Res() request): Promise<any> {
    const available = await this.listAvailableUsecase.execute();
    return request.status(HttpStatus.OK).json(available);
  }

  @Get('/types')
  async listVehicleTypes(@Res() request): Promise<any> {
    const vehicleTypes = await this.listVehicleTypesUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicleTypes);
  }

  @Patch(':id')
  async updateVehicle(
    @Res() request,
    @Body() vehicle: Partial<CreateVehicleDto>,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const updated = await this.updateVehicleUsecase.execute(id, vehicle);
    return request.status(HttpStatus.OK).json(updated);
  }

  @Delete(':id')
  async deleteVehicle(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const deleted = await this.deleteVehicleUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deleted);
  }
}
