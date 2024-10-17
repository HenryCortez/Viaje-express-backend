import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { CreateDetailDto } from "src/travel/application/dto/create-detail.dto";
import { DetailRepositoryPort } from "src/travel/domain/repositories/detail.repository.port";


@Injectable()
export class DetailRepositoryAdapter implements DetailRepositoryPort {
    constructor(private readonly prisma: PrismaClient) {}
    listDetails(travelId: number): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    createDetail(detail: CreateDetailDto): Promise<any> {
        throw new Error("Method not implemented.");
    }
    updateDetail(id: number, detail: Partial<CreateDetailDto>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteDetail(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}