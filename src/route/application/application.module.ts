import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateRouteUseCase } from './usecase/create-route.usecase';
import { UpdateRouteUseCase } from './usecase/update-route.usecase';
import { DeleteRouteUseCase } from './usecase/delete-route.usecase';
import { ListRoutesUseCase } from './usecase/list-routes.usecase';
import { ListCitiesUseCase } from './usecase/list-cities.usecase';
import { RouteRepositoryAdapter } from '../infraestructure/repositories/prisma.route.repository.adapter';

@Module({
    imports: [CommonModule],
    providers: [
        CreateRouteUseCase,
        UpdateRouteUseCase,
        DeleteRouteUseCase,
        ListRoutesUseCase,
        ListCitiesUseCase,
        {
            provide: 'RouteRepository',
            useClass: RouteRepositoryAdapter,
        }
    ],
    exports: [
        CreateRouteUseCase,
        UpdateRouteUseCase,
        DeleteRouteUseCase,
        ListRoutesUseCase,
        ListCitiesUseCase,
        'RouteRepository'
    ],
})
export class ApplicationRouteModule {}
