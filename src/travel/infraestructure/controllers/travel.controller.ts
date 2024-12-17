import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/infraestructure/decorators/roles.decorator";
import { AuthGuard } from "src/auth/infraestructure/guards/auth.guard";
import { RolesGuard } from "src/auth/infraestructure/guards/roles.guard";
import { CreateTravelDto } from "src/travel/application/dto/create-travel.dto";
import { CreateTravelUseCase } from "src/travel/application/usecases/travel/create-travel.usecase";
import { DeleteTravelUseCase } from "src/travel/application/usecases/travel/delete-travel.usecase";
import { ListAllTravelsUseCase } from "src/travel/application/usecases/travel/list-all-travels.usecase";
import { ListIncomeUseCase } from "src/travel/application/usecases/travel/list-income.usecase";
import { ListTravelsUseCase } from "src/travel/application/usecases/travel/list-travel.usecase";
import { UpdateTravelUseCase } from "src/travel/application/usecases/travel/update-travel.usecase";

@Controller('travel')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class TravelController {
    constructor(
        private readonly createTravelUsecase: CreateTravelUseCase,
        private readonly deleteTravelUsecase: DeleteTravelUseCase,
        private readonly listTravelUsecase: ListTravelsUseCase,
        private readonly listIncomeUsecase: ListIncomeUseCase,
        private readonly updateTravelUsecase: UpdateTravelUseCase,
        private readonly listAllTravelsUsecase: ListAllTravelsUseCase,
    ){}

    @Post()
    async createTravel(@Res() request,
    @Body() travel: CreateTravelDto): Promise<any> {
        const createdTravel = await this.createTravelUsecase.execute(travel);
        return request.status(HttpStatus.CREATED).json(createdTravel);
    }

    @Get()
    async listTravels(@Res() request): Promise<any> {
        const travels = await this.listTravelUsecase.execute();
        return request.status(HttpStatus.OK).json(travels);
    }

    @Get('/all')
    async listAllTravels(@Res() request): Promise<any> {
        const travels = await this.listAllTravelsUsecase.execute();
        return request.status(HttpStatus.OK).json(travels);
    }

    @Get(':id')
    async listIncome(@Res() request, @Param('id', ParseIntPipe) id: number,): Promise<any> {
        const income = await this.listIncomeUsecase.execute(id);
        return request.status(HttpStatus.OK).json(income);
    }

    @Patch(':id')
    async updateTravel(
        @Res() request,
        @Body() travel: Partial<CreateTravelDto>,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        const updatedTravel = await this.updateTravelUsecase.execute(id, travel);
        return request.status(HttpStatus.OK).json(updatedTravel);
    }

    @Delete(':id')
    async deleteTravel(
        @Res() request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        await this.deleteTravelUsecase.execute(id);
        return request.status(HttpStatus.NO_CONTENT).json();
    }
}