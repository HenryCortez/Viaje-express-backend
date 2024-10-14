import { CreateVehicleDto } from "src/vehicle/application/dto/create-vehicle.dto";

export interface VehicleRepositoryPort {
    createVehicle(vehicle: CreateVehicleDto): Promise<any>;
    listAvailableVehicles(): Promise<any[]>;
    listVehicles(): Promise<any[]>;
    updateVehicle(id: number, vehicle: Partial<CreateVehicleDto>): Promise<any>;
    deleteVehicle(id: number): Promise<boolean>;
    listVehicleTypes(): Promise<any[]>;
  }
  