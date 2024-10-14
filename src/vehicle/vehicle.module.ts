import { Module } from '@nestjs/common';
import { InfraestructureVehicleModule } from './infraestructure/infraestructure.module';
import { DomainVehicleModule } from './domain/domain.module';
import { ApplicationVehicleModule } from './application/application.module';

@Module({
  imports: [InfraestructureVehicleModule, DomainVehicleModule, ApplicationVehicleModule]
})
export class VehicleModule {}
