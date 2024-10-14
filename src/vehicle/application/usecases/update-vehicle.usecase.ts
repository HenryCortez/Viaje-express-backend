import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number, vehicle: Partial<CreateVehicleDto>): Promise<any> {
    const updatedVehicle = await this.vehicleRepository.updateVehicle(id,vehicle );
    return updatedVehicle;
  }
}