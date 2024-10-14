import { Inject, Injectable } from "@nestjs/common";
import { DriverRepositoryPort } from "src/driver/domain/repositories/driver.repository.port";

@Injectable()
export class ListDriverUseCase {
  constructor(
    @Inject('DriverRepository') private driverRepository: DriverRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const listedDrivers = await this.driverRepository.listDrivers();
    return listedDrivers;
  }
}