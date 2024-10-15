import { HttpException, Injectable } from "@nestjs/common";
import { City, PrismaClient } from "@prisma/client";
import { CreateRouteDto } from "src/route/application/dto/create-route.dto";
import { RouteRepositoryPort } from "src/route/domain/repositories/route.repository.port";


@Injectable()
export class RouteRepositoryAdapter implements RouteRepositoryPort {
    constructor(private readonly prisma: PrismaClient) {}
    async listRoutes(): Promise<any[]> {
        return await this.prisma.route.findMany();
    }
    async listCities(): Promise<any[]> {
        return await this.prisma.city.findMany();
    }
    //busca la ciudad o la crea
    private async getCity(name: string): Promise<City> {
        let city;
        try {
            console.log(name);
            city = await this.prisma.city.findFirstOrThrow({
                where: {
                    name: name.toLowerCase(),
                },
            });
        } catch (error) {
            city = await this.prisma.city.create({
                data: {
                    name: name.toLowerCase(),
                },
            });
        }
        return city;
    }
    async createRoute(route: CreateRouteDto): Promise<any> {
        let cityO = await this.getCity(route.ocity);
        console.log(cityO);
        let cityD = await this.getCity(route.dcity);
        try {
            return await this.prisma.route.create({
                data: {
                    origin_city_id: cityO.id,
                    destination_city_id: cityD.id,
                    latitude_origin: route.latitudeO,
                    longitude_origin: route.longitudeO,
                    latitude_destination: route.latitudeD,
                    longitude_destination: route.longitudeD,
                },
            });
        } catch (error) {
            console.log(error);
            throw new HttpException('Error creando la ruta', 500);
        }
    }
    async updateRoute(id: number, route: CreateRouteDto): Promise<any> {
        let cityO = await this.getCity(route.ocity);
        
        let cityD = await this.getCity(route.dcity);
        try {
            return await this.prisma.route.update({
                where: {
                    id: id,
                },
                data: {
                    origin_city_id: cityO.id,
                    destination_city_id: cityD.id,
                    latitude_origin: route.latitudeO,
                    longitude_origin: route.longitudeO,
                    latitude_destination: route.latitudeD,
                    longitude_destination: route.longitudeD,
                },
            });
        } catch (error) {
            throw new HttpException('Error editando la ruta', 500);
        }
    }

    async deleteRoute(id: number): Promise<boolean> {
        try {
            await this.prisma.route.delete({
                where: {
                    id: id,
                },
            });
            return true;
        } catch (error) {
            throw new HttpException('Error eliminando la ruta', 500);
        }
    }

}