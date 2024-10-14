import { Inject, Injectable } from "@nestjs/common";
import { DriverRepositoryPort } from "src/driver/domain/repositories/driver.repository.port";
import { CreateDriverDto } from "../dto/create-driver-dto";


@Injectable()
export class CreateDriverUseCase {
  constructor(
    @Inject('DriverRepository') private driverRepository: DriverRepositoryPort,
  ) {}

  async execute(driver: CreateDriverDto): Promise<any> {
    const createdDriver = await this.driverRepository.createDriver(driver);
    return createdDriver;
  }
}