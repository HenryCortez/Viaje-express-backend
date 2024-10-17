
import { CreateTravelDto } from "src/travel/application/dto/create-travel.dto";

export interface TravelRepositoryPort{
    listTravels(): Promise<any[]>;
    createTravel(travel: CreateTravelDto): Promise<any>;
    updateTravel(id: number, travel: Partial<CreateTravelDto>): Promise<any>;
    deleteTravel(id: number): Promise<boolean>;
}