import { Inject, Injectable } from "@nestjs/common";
import { DriverRepositoryPort } from "src/driver/domain/repositories/driver.repository.port";


@Injectable()
export class DeleteDriverUseCase {
  constructor(
    @Inject('DriverRepository') private driverRepository: DriverRepositoryPort,
  ) {}

  async execute(id: number): Promise<any> {
    const deletedDriver = await this.driverRepository.deleteDriver(id);
    return deletedDriver;
  }
}