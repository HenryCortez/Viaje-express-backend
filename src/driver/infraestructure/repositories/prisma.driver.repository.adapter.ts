import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateDriverDto } from 'src/driver/application/dto/create-driver-dto';
import { DriverRepositoryPort } from 'src/driver/domain/repositories/driver.repository.port';

@Injectable()
export class DriverRepositoryAdapter implements DriverRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createDriver(driver: CreateDriverDto): Promise<any> {
    let user;
    try {
      user = await this.prisma.user.update({
        where: {
          id: driver.userId,
        },
        data: {
          role: Role.DRIVER,
        },
      });
    } catch (error) {
      throw new HttpException('No existe el usuario', 500);
    }
    let existDriver;
    try {
      existDriver = await this.prisma.driver.findUnique({
        where: {
          id_card: driver.id_card,
        },
      });
    } catch {}

    if (existDriver) {
      return await this.prisma.driver.update({
        where: {
          id: existDriver.id,
        },
        data: {
          status: true,
        },
      });
    }

    try {
      return await this.prisma.driver.create({
        data: {
          user_id: driver.userId,
          id_card: driver.id_card,
          status: user.status,
        },
      });
    } catch (error) {
      throw new HttpException('Error creando el conductor', 500);
    }
  }
  async listDrivers(): Promise<any[]> {
    return await this.prisma.driver.findMany({
      where: {
        status: true,
      },
    });
  }
  async deleteDriver(ide: number): Promise<boolean> {
    try {
      const driver = await this.prisma.driver.update({
        where: {
          id: ide,
        },
        data: {
          status: false,
        },
      });
      await this.prisma.user.update({
        where: {
          id: driver.user_id,
        },
        data: {
          role: Role.CLIENT,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException('Error eliminando el conductor', 500);
    }
  }
}
