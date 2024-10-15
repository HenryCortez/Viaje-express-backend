import { CreateRouteDto } from "src/route/application/dto/create-route.dto";

export interface RouteRepositoryPort {
    listRoutes(): Promise<any[]>;
    listCities(): Promise<any[]>;
    createRoute(route: CreateRouteDto): Promise<any>;
    
    updateRoute(id: number ,route: CreateRouteDto): Promise<any>;
    
    deleteRoute(id: number): Promise<boolean>;
    
}