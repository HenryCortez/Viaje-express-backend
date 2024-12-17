import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTravelDto } from 'src/travel/application/dto/create-travel.dto';
import { TravelRepositoryPort } from 'src/travel/domain/repositories/travel.repository.port';

@Injectable()
export class TravelRepositoryAdapter implements TravelRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}
  async listAllTravels(): Promise<any[]> {
    return await this.prisma.travel.findMany(
      {
        where: {
          status: 'Finalizado',
        }
      }
    );
  }
  async listIncomeByTravel(travelId: number): Promise<number> {
    let details = await this.prisma.travelDetail.findMany({
      where: {
        travelId,
      },
    });
    let total = 0;
    for (let detail of details) {
      total += detail.TotalPrice;
    }
    
    return total;
  }
  async listTravels(): Promise<any[]> {
    return await this.prisma.travel.findMany({
      where: {
        NOT: {
          OR: [{ status: 'Cancelado' }, { status: 'Finalizado' }],
        },
      },
    });
  }
  async createTravel(travel: CreateTravelDto): Promise<any> {
    const now = new Date();
    now.setHours(now.getHours() - 5);
    if (travel.departure_datetime < now) {
      throw new HttpException(
        'La fecha de salida no puede ser menor a la actual',
        400,
      );
    }
    if (travel.availableSeats < 0) {
      throw new HttpException(
        'La cantidad de asientos disponibles no puede ser menor a 0',
        400,
      );
    }
    if (travel.estimatedArrival < travel.departure_datetime) {
      throw new HttpException(
        'La fecha de llegada no puede ser menor a la fecha de salida',
        400,
      );
    }
    try {
      return await this.prisma.travel.create({
        data: {
          departure_datetime: travel.departure_datetime,
          assignmentHistoryId: travel.assignmentHistoryId,
          availableSeats: travel.availableSeats,
          routeId: travel.routeId,
          estimatedArrival: travel.estimatedArrival,
        },
      });
    } catch (error) {
      throw new HttpException('Error en la creacion del viaje', 500);
    }
  }

  async updateTravel(
    id: number,
    travel: Partial<CreateTravelDto>,
  ): Promise<any> {
    let travelaux;
    try {
      travelaux = await this.prisma.travel.findUniqueOrThrow({
        where: {
          id,
        },
      });
      let assignment = await this.prisma.assignmentHistory.findUnique({
        where: {
          id: travelaux.assignmentHistoryId,
        },
      });
      
      if (travel.status === 'Cursando'){
        await this.prisma.vehicle.update({
          where: {
            id: assignment.vehicleId
          },
          data: {
            status: false
          }
        });
      }else if (travel.status === 'Finalizado'){
        await this.prisma.vehicle.update({
          where: {
            id: assignment.vehicleId
          },
          data: {
            status: true
          }
        });
      }
    } catch (error) {
      throw new HttpException('El viaje no existe', 404);
    }
    if (travelaux.status === 'Cancelado' || travelaux.status === 'Finalizado') {
      throw new HttpException('El viaje no puede ser modificado', 400);
    }
    const differenceInHours =
      Math.abs(
        travelaux.estimatedArrival.getTime() -
          travelaux.departure_datetime.getTime(),
      ) / 36e5;

    return await this.prisma.travel.update({
      where: {
        id,
      },
      data: {
        assignmentHistoryId:
          travel.assignmentHistoryId || travelaux.assignmentHistoryId,
        availableSeats: travel.availableSeats || travelaux.availableSeats,
        status: travel.status || travelaux.status,
        departure_datetime:
          travel.departure_datetime || travelaux.departure_datetime,
        estimatedArrival: travel.departure_datetime
          ? new Date(
              new Date(travel.departure_datetime).getTime() +
                differenceInHours * 36e5,
            )
          : travelaux.estimatedArrival,
      },
    });
  }

  async deleteTravel(id: number): Promise<boolean> {
    let travelaux;
    try {
      travelaux = await this.prisma.travel.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('El viaje no existe', 404);
    }
    if (travelaux.status === 'Cancelado' || travelaux.status === 'Finalizado') {
      throw new HttpException('El viaje no puede ser eliminado', 400);
    }
    await this.prisma.travelDetail.deleteMany({
      where: {
        travelId: id,
      },
    });
    await this.prisma.travel.update({
      where: {
        id,
      },
        data: {
            status: 'Cancelado',
            assignmentHistoryId: null,
            routeId: null,
        },
    });
    return true;
  }
}
