import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';

@Injectable()
export class ListAvailableUseCase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const vehicle = await this.vehicleRepository.listAvailableVehicles();
    return vehicle;
  }
}