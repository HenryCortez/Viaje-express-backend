import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class CreateVehicleUseCase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(vehicle: CreateVehicleDto): Promise<any> {
    const createdVehicle = await this.vehicleRepository.createVehicle(vehicle);
    return createdVehicle;
  }
}