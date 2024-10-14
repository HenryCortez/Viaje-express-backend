import { Module } from '@nestjs/common';
import { InfraestructureVehicleModule } from './infraestructure/infraestructure.module';
import { DomainVehicleModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [InfraestructureVehicleModule, DomainVehicleModule, ApplicationModule]
})
export class VehicleModule {}
