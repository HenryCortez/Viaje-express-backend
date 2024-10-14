import { Module } from '@nestjs/common';
import { InfraestructureDriverModule } from './infraestructure/infraestructure.module';
import { ApplicationDriverModule } from './application/application.module';
import { DomainDriverModule } from './domain/domain.module';

@Module({
  imports: [InfraestructureDriverModule, ApplicationDriverModule, DomainDriverModule]
})
export class DriverModule {}
