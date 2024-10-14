import { CreateDriverDto } from "src/driver/application/dto/create-driver-dto";

export interface DriverRepositoryPort {
  createDriver(driver: CreateDriverDto): Promise<any>;
  listDrivers(): Promise<any[]>;
  deleteDriver(id: number): Promise<boolean>;
}
