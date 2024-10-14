import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';

@Injectable()
export class ListVehicleTypesUseCase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const vehicleTypes = await this.vehicleRepository.listVehicleTypes();
    return vehicleTypes;
  }
}