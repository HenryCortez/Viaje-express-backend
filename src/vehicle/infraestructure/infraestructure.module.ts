import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ApplicationVehicleModule } from '../application/application.module';
import { VehicleController } from './controllers/vehicle.controller';

@Module({
    imports: [
        CommonModule,
        ApplicationVehicleModule
    ],
    controllers: [VehicleController],
})
export class InfraestructureVehicleModule {}
