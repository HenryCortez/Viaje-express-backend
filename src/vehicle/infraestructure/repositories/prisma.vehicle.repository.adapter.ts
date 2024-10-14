import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateVehicleDto } from 'src/vehicle/application/dto/create-vehicle.dto';
import { VehicleRepositoryPort } from 'src/vehicle/domain/repositories/vehicle.repository.port';

@Injectable()
export class VehicleRepositoryAdapter implements VehicleRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}
  async listAvailableVehicles(): Promise<any[]> {
    return await this.prisma.vehicle.findMany({
      where: {
        status: true,
      },
    });
  }

  async createVehicle(vehicle: CreateVehicleDto): Promise<any> {
    console.log(vehicle.status);
    try {
      return await this.prisma.vehicle.create({
        data: {
          licence_plate: vehicle.licence_plate,
          brand: vehicle.brand,
          model: vehicle.model,
          color: vehicle.color,
          typeId: vehicle.typeId,
          status: vehicle.status !== undefined ? vehicle.status : true,
        },
      });
    } catch (error) {
      throw new HttpException('Error creando el vehiculo', 500);
    }
  }

  async listVehicles(): Promise<any[]> {
    return await this.prisma.vehicle.findMany();
  }

  async updateVehicle(
    id: number,
    vehicle: Partial<CreateVehicleDto>,
  ): Promise<any> {
    console.log(vehicle.status);
    let vehicleToUpdate;
    try {
      vehicleToUpdate = await this.prisma.vehicle.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException('El vehiculo no existe', 500);
    }

    try {
      return await this.prisma.vehicle.update({
        where: {
          id: id,
        },
        data: {
          model: vehicle.model || vehicleToUpdate.model,
          brand: vehicle.brand || vehicleToUpdate.brand,
          typeId: vehicle.typeId || vehicleToUpdate.typeId,
          color: vehicle.color || vehicleToUpdate.color,
          status:
            vehicle.status !== undefined
              ? vehicle.status
              : vehicleToUpdate.status,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error actualizando el vehiculo, posiblemente el tipo no exista',
        500,
      );
    }
  }

  async deleteVehicle(id: number): Promise<boolean> {
    try {
      await this.prisma.vehicle.update({
        where: {
          id: id,
        },
        data: {
          status: false,
        },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error eliminando el vehiculo', 500);
    }
  }

  async listVehicleTypes(): Promise<any[]> {
    return await this.prisma.vehicleType.findMany();
  }
}
