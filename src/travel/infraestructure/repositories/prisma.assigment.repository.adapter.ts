import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAssigmentDto } from 'src/travel/application/dto/create-historial.dto';
import { AssigmentRepositoryPort } from 'src/travel/domain/repositories/assigment.repository.port';

@Injectable()
export class AssigmentRepositoryAdapter implements AssigmentRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}
  async listAssigments(): Promise<any[]> {
    return await this.prisma.assignmentHistory.findMany();
  }
  async createAssigment(assigment: CreateAssigmentDto): Promise<any> {
    if (!this.getVehicle(assigment.vehicleId)) {
      throw new HttpException(
        'Error, el vehiculo seleccionado no esta disponible',
        500,
      );
    }

    if (!this.getDriver(assigment.driverId)) {
      throw new HttpException('Error, no existe ese conductor', 500);
    }
    const now = new Date();
    now.setHours(now.getHours() - 5);

    console.log(now);
    try {
      return await this.prisma.assignmentHistory.create({
        data: {
          driverId: assigment.driverId,
          vehicleId: assigment.vehicleId,
          date: now,
        },
      });
    } catch (error) {
      throw new HttpException('Error en la creacion de la asignacion', 500);
    }
  }

  async updateAssigment(
    id: number,
    assigment: Partial<CreateAssigmentDto>,
  ): Promise<any> {
    if (!this.getVehicle(assigment.vehicleId)) {
      throw new HttpException(
        'Error, el vehiculo seleccionado no esta disponible',
        500,
      );
    }

    if (!this.getDriver(assigment.driverId)) {
      throw new HttpException('Error, no existe ese conductor', 500);
    }
    let assig;
    try {
      assig = await this.prisma.assignmentHistory.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('Error, no existe la asignacion', 500);
    }
    const now = new Date();
    now.setHours(now.getHours() - 5);
    return await this.prisma.assignmentHistory.update({
      where: {
        id: id,
      },
      data: {
        driverId: assigment.driverId || assig.driverId,
        vehicleId: assigment.vehicleId || assig.vehicleId,
        updatedDate: now,
      },
    });
  }
  async deleteAssigment(id: number): Promise<boolean> {
    try {
      await this.prisma.assignmentHistory.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error, no existe la asignacion', 500);
    }
  }

  private async getVehicle(id: number): Promise<boolean> {
    try {
      let vehicle = await this.prisma.vehicle.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      if (!vehicle.status) {
        vehicle = undefined;
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private async getDriver(id: number): Promise<boolean> {
    try {
      let driver = await this.prisma.driver.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      if (!driver.status) {
        driver = undefined;
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
