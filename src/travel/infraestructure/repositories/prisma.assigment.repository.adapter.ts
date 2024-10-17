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
    try {
      let vehicle = await this.prisma.vehicle.findUniqueOrThrow({
        where: {
          id: assigment.vehicleId,
        },
      });
      if (!vehicle.status) {
        vehicle = undefined;
        throw new HttpException(
          'Error, el vehiculo seleccionado no esta disponible.',
          500,
        );
      }
    } catch (error) {
      throw new HttpException('Error, no existe ese vehiculo', 500);
    }

    try {
      let driver = await this.prisma.driver.findUniqueOrThrow({
        where: {
          id: assigment.driverId,
        },
      });
      if (!driver.status) {
        driver = undefined;
        throw new HttpException(
          'Error, el conductor seleccionado no esta disponible.',
          500,
        );
        
      }
    } catch (error) {
      throw new HttpException('Error, no existe ese conductor', 500);
    }

    try {
      return await this.prisma.assignmentHistory.create({
        data: {
          driverId: assigment.driverId,
          vehicleId: assigment.vehicleId,
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
    
    return await this.prisma.assignmentHistory.update({
        where: {
            id: id
        },
        data: {
            driverId: assigment.driverId 
        }
    })
  }
  async deleteAssigment(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
