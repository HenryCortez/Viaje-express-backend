import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/infraestructure/decorators/roles.decorator";
import { AuthGuard } from "src/auth/infraestructure/guards/auth.guard";
import { RolesGuard } from "src/auth/infraestructure/guards/roles.guard";
import { CreateAssigmentDto } from "src/travel/application/dto/create-historial.dto";
import { CreateAssigmentUseCase } from "src/travel/application/usecases/assigment/create-assigment.usecase";
import { DeleteAssigmentUseCase } from "src/travel/application/usecases/assigment/delete-assigment.usecase";
import { ListAssigmentsUseCase } from "src/travel/application/usecases/assigment/list-assigment.usecase";
import { UpdateAssigmentUseCase } from "src/travel/application/usecases/assigment/update-assigment.usecase";

@Controller('assigment')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class AssigmentController {
    constructor(
        private readonly createAssigmentUsecase: CreateAssigmentUseCase,
        private readonly deleteAssigmentUsecase: DeleteAssigmentUseCase,
        private readonly listAssigmentUsecase: ListAssigmentsUseCase,
        private readonly updateAssigmentUsecase: UpdateAssigmentUseCase,
    ){}

    @Post()
    async createAssigment(@Res() request,
    @Body() assigment: CreateAssigmentDto,): Promise<any> {
        const createdAssigment = await this.createAssigmentUsecase.execute(assigment);
        return request.status(HttpStatus.CREATED).json(createdAssigment);
    }

    @Get()
    async listAssigments(@Res() request): Promise<any> {
        const assigments = await this.listAssigmentUsecase.execute();
        return request.status(HttpStatus.OK).json(assigments);
    }

    @Patch(':id')
    async updateAssigment(
        @Res() request,
        @Body() assigment: Partial<CreateAssigmentDto>,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        const updatedAssigment = await this.updateAssigmentUsecase.execute(id, assigment);
        return request.status(HttpStatus.OK).json(updatedAssigment);
    }

    @Delete(':id')
    async deleteAssigment(
        @Res() request,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
        await this.deleteAssigmentUsecase.execute(id);
        return request.status(HttpStatus.NO_CONTENT).json();
    }
}