import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateAssigmentUseCase } from './usecases/assigment/create-assigment.usecase';
import { CreateDetailUseCase } from './usecases/detail/create-detail.usecase';
import { CreateTravelUseCase } from './usecases/travel/create-travel.usecase';
import { DeleteAssigmentUseCase } from './usecases/assigment/delete-assigment.usecase';
import { DeleteDetailUseCase } from './usecases/detail/delete-detail.usecase';
import { DeleteTravelUseCase } from './usecases/travel/delete-travel.usecase';
import { ListAssigmentsUseCase } from './usecases/assigment/list-assigment.usecase';
import { ListTravelsUseCase } from './usecases/travel/list-travel.usecase';
import { ListDetailsUseCase } from './usecases/detail/list-detail.usecase';
import { UpdateAssigmentUseCase } from './usecases/assigment/update-assigment.usecase';
import { UpdateDetailUseCase } from './usecases/detail/update-detail.usecase';
import { UpdateTravelUseCase } from './usecases/travel/update-travel.usecase';
import { AssigmentRepositoryAdapter } from '../infraestructure/repositories/prisma.assigment.repository.adapter';
import { DetailRepositoryAdapter } from '../infraestructure/repositories/prisma.detail.repository.adapter';
import { TravelRepositoryAdapter } from '../infraestructure/repositories/prisma.travel.repository.adapter';
import { ListIncomeUseCase } from './usecases/travel/list-income.usecase';
import { ListAllTravelsUseCase } from './usecases/travel/list-all-travels.usecase';

@Module({
    imports:[CommonModule],
    providers:[
        CreateAssigmentUseCase,
        CreateDetailUseCase,
        CreateTravelUseCase,
        DeleteAssigmentUseCase,
        DeleteDetailUseCase,
        DeleteTravelUseCase,
        ListAssigmentsUseCase,
        ListTravelsUseCase,
        ListDetailsUseCase,
        UpdateAssigmentUseCase,
        UpdateDetailUseCase,
        UpdateTravelUseCase,
        ListIncomeUseCase,
        ListAllTravelsUseCase,
        {
            provide: 'AssigmentRepository',
            useClass: AssigmentRepositoryAdapter
        },
        {
            provide: 'DetailRepository',
            useClass: DetailRepositoryAdapter
        },
        {
            provide: 'TravelRepository',
            useClass: TravelRepositoryAdapter
        }
    ],
    exports:[
        CreateAssigmentUseCase,
        CreateDetailUseCase,
        CreateTravelUseCase,
        DeleteAssigmentUseCase,
        DeleteDetailUseCase,
        DeleteTravelUseCase,
        ListAssigmentsUseCase,
        ListTravelsUseCase,
        ListDetailsUseCase,
        UpdateAssigmentUseCase,
        UpdateDetailUseCase,
        UpdateTravelUseCase,
        'AssigmentRepository',
        'DetailRepository',
        'TravelRepository',
        ListIncomeUseCase,
        ListAllTravelsUseCase
    ],
})
export class ApplicationTravelModule {}
