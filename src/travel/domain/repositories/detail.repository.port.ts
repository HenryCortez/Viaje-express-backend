import { CreateDetailDto } from "src/travel/application/dto/create-detail.dto";

export interface DetailRepositoryPort{
    listDetails(travelId: number): Promise<any[]>;
    createDetail(detail: CreateDetailDto):Promise<any>;
    updateDetail(id: number, detail: Partial<CreateDetailDto>): Promise<any>;
    deleteDetail(id: number): Promise<boolean>;
}