import { Module } from '@nestjs/common';
import { ApplicationTravelModule } from './application/application.module';
import { DomainTravelModule } from './domain/domain.module';
import { InfraestructureTravelModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [ApplicationTravelModule, DomainTravelModule, InfraestructureTravelModule]
})
export class TravelModule {}
