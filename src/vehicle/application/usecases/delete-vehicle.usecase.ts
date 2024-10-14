import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number): Promise<any> {
    const deletedVehicle = await this.vehicleRepository.deleteVehicle(id);
    return deletedVehicle;
  }
}