
import { CreateTravelDto } from "src/travel/application/dto/create-travel.dto";

export interface TravelRepositoryPort{
    listTravels(): Promise<any[]>;
    listAllTravels(): Promise<any[]>;
    listIncomeByTravel(travelId: number): Promise<number>;
    createTravel(travel: CreateTravelDto): Promise<any>;
    updateTravel(id: number, travel: Partial<CreateTravelDto>): Promise<any>;
    deleteTravel(id: number): Promise<boolean>;
}