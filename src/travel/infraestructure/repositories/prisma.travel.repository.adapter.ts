import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateTravelDto } from "src/travel/application/dto/create-travel.dto";
import { TravelRepositoryPort } from "src/travel/domain/repositories/travel.repository.port";


@Injectable()
export class TravelRepositoryAdapter implements TravelRepositoryPort {
    constructor(private readonly prisma: PrismaClient) {}
    listTravels(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    createTravel(travel: CreateTravelDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateTravel(id: number, travel: Partial<CreateTravelDto>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteTravel(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}