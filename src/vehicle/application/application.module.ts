import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateVehicleUseCase } from './usecases/create-vehicle.usecase';
import { DeleteVehicleUseCase } from './usecases/delete-vehicle.usecase';
import { ListAvailableUseCase } from './usecases/list-available.usecase';
import { ListVehicleTypesUseCase } from './usecases/list-vehicle-types.usecase';
import { ListVehicleUseCase } from './usecases/list-vehicles.usecase';
import { UpdateVehicleUseCase } from './usecases/update-vehicle.usecase';
import { VehicleRepositoryAdapter } from '../infraestructure/repositories/prisma.vehicle.repository.adapter';

@Module({
    imports: [
        CommonModule
    ],
    providers: [
        CreateVehicleUseCase,
        DeleteVehicleUseCase,
        ListAvailableUseCase,
        ListVehicleTypesUseCase,
        ListVehicleUseCase,
        UpdateVehicleUseCase,
        {
            provide: 'VehicleRepository',
            useClass: VehicleRepositoryAdapter
        }
    ],
    exports: [
        CreateVehicleUseCase,
        DeleteVehicleUseCase,
        ListAvailableUseCase,
        ListVehicleTypesUseCase,
        ListVehicleUseCase,
        UpdateVehicleUseCase,
        'VehicleRepository'
    ],
})
export class ApplicationVehicleModule {}
