import { Controller, UseGuards } from "@nestjs/common";
import { Roles } from "src/auth/infraestructure/decorators/roles.decorator";
import { AuthGuard } from "src/auth/infraestructure/guards/auth.guard";
import { RolesGuard } from "src/auth/infraestructure/guards/roles.guard";
import { CreateAssigmentUseCase } from "src/travel/application/usecases/assigment/create-assigment.usecase";
import { DeleteAssigmentUseCase } from "src/travel/application/usecases/assigment/delete-assigment.usecase";
import { ListAssigmentsUseCase } from "src/travel/application/usecases/assigment/list-assigment.usecase";
import { UpdateAssigmentUseCase } from "src/travel/application/usecases/assigment/update-assigment.usecase";
import { CreateDetailUseCase } from "src/travel/application/usecases/detail/create-detail.usecase";
import { DeleteDetailUseCase } from "src/travel/application/usecases/detail/delete-detail.usecase";
import { ListDetailsUseCase } from "src/travel/application/usecases/detail/list-detail.usecase";
import { UpdateDetailUseCase } from "src/travel/application/usecases/detail/update-detail.usecase";
import { CreateTravelUseCase } from "src/travel/application/usecases/travel/create-travel.usecase";
import { DeleteTravelUseCase } from "src/travel/application/usecases/travel/delete-travel.usecase";
import { ListTravelsUseCase } from "src/travel/application/usecases/travel/list-travel.usecase";
import { UpdateTravelUseCase } from "src/travel/application/usecases/travel/update-travel.usecase";

@Controller('route')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class TravelController {
    constructor(
        private readonly createAssigmentUsecase: CreateAssigmentUseCase,
        private readonly deleteAssigmentUsecase: DeleteAssigmentUseCase,
        private readonly listAssigmentUsecase: ListAssigmentsUseCase,
        private readonly updateAssigmentUsecase: UpdateAssigmentUseCase,
        private readonly createDetailUsecase: CreateDetailUseCase,
        private readonly deleteDetailUsecase: DeleteDetailUseCase,
        private readonly listDetailUsecase: ListDetailsUseCase,
        private readonly updateDetailUsecase: UpdateDetailUseCase,
        private readonly createTravelUsecase: CreateTravelUseCase,
        private readonly deleteTravelUsecase: DeleteTravelUseCase,
        private readonly listTravelUsecase: ListTravelsUseCase,
        private readonly updateTravelUsecase: UpdateTravelUseCase,
    ){}
}