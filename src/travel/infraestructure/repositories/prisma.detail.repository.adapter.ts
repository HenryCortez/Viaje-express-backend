import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Status } from '@prisma/client';
import { CreateDetailDto } from 'src/travel/application/dto/create-detail.dto';
import { DetailRepositoryPort } from 'src/travel/domain/repositories/detail.repository.port';

@Injectable()
export class DetailRepositoryAdapter implements DetailRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}
  async listDetails(travelId: number): Promise<any[]> {
    return await this.prisma.travelDetail.findMany({
      where: {
        travelId: travelId,
      },
    });
  }
  async createDetail(detail: CreateDetailDto): Promise<any> {
    if (!await this.getTravel(detail.travelId, detail.seatNumber)) {
      throw new HttpException(
        'Error, el viaje no puede tener mas registros',
        500,
      );
    }

    if ( !await this.getUser(detail.userId)) {
      throw new HttpException('Error, el usuario no existe', 500);
    }
    let price: number = await this.getPrice(detail.travelId);
    price = price * detail.seatNumber;
    try {
      await this.reduceSeats(detail.travelId, detail.seatNumber);
      return await this.prisma.travelDetail.create({
        data: {
          travelId: detail.travelId,
          userId: detail.userId,
          seatNumber: detail.seatNumber,
          normalPrice: price,
          distanceAmount: detail.distanceAmount,
          TotalPrice: price + detail.distanceAmount,
        },
      });
    } catch (error) {
      throw new HttpException('Error en la creacion del detalle', 500);
    }
  }
  async updateDetail(
    id: number,
    detail: Partial<CreateDetailDto>,
  ): Promise<any> {
    try {
      
        let detailaux = await this.prisma.travelDetail.findUniqueOrThrow({
            where: {
                id: id,
            },
        });
        const travel = await this.prisma.travel.findUniqueOrThrow({
            where: {
                id: detailaux.travelId,
            },
        });
        if (travel.status == Status.Finalizado || travel.status == Status.Cancelado) {
            throw new HttpException('Error, No se actualizan detalles al finalizar el viaje', 500);
        }
        await this.increaseSeats(detailaux.travelId, detailaux.seatNumber);
        await this.reduceSeats(detailaux.travelId, detail.seatNumber);
        let price: number = await this.getPrice(detail.travelId);
        price = price * detail.seatNumber;
        return await this.prisma.travelDetail.update({
            where: {
                id: id,
            },
            data: {
                seatNumber: detail.seatNumber,
               normalPrice: price,
               TotalPrice: price + detailaux.distanceAmount
            }});
    } catch (error) {
        throw new HttpException('Error en la actualizacion del detalle', 500);
    }
  }
  async deleteDetail(id: number): Promise<boolean> {
    let detailaux = await this.prisma.travelDetail.findUniqueOrThrow({
        where: {
            id: id,
        },
    });
    const travel = await this.prisma.travel.findUniqueOrThrow({
        where: {
            id: detailaux.travelId,
        },
    });
    if (travel.status == Status.Finalizado) {
        throw new HttpException('Error, No se eliminan detalles al finalizar el viaje', 500);
    }
    await this.increaseSeats(detailaux.travelId, detailaux.seatNumber);
    try {
        await this.prisma.travelDetail.delete({
            where: {
                id: id,
            },
        });
        return true;
    } catch (error) {
        throw new HttpException('Error en la eliminacion del detalle', 500);
    }
  }

  private async getTravel(id: number, seats: number) {
    try {
      let travel = await this.prisma.travel.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      
      if (
        travel.status !== Status.Pendiente ||
        travel.availableSeats === 0 ||
        travel.availableSeats < seats
      ) {
      
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private async getUser(id: number) {
    try {
      let user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      if (!user.status) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private async getPrice(id: number): Promise<number> {
    let travel = await this.prisma.travel.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    let assigment = await this.prisma.assignmentHistory.findUniqueOrThrow({
      where: {
        id: travel.assignmentHistoryId,
      },
    });
    let vehicle = await this.prisma.vehicle.findUniqueOrThrow({
      where: {
        id: assigment.vehicleId,
      },
    });
    let type = await this.prisma.vehicleType.findUniqueOrThrow({
      where: {
        id: vehicle.typeId,
      },
    });
    return type.price;
  }

  private async reduceSeats(id: number, seats: number) {
    await this.prisma.travel.update({
        where: {
          id: id,
        },
        data: {
          availableSeats: {
            decrement: seats,
          },
        },
      });
  }

  private async increaseSeats(id: number, seats: number) {
    await this.prisma.travel.update({
        where: {
            id: id,
        },
        data: {
            availableSeats: {
                increment: seats,
            },
        },
    });
  }
}
