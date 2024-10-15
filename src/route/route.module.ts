import { Module } from '@nestjs/common';
import { ApplicationRouteModule } from './application/application.module';
import { DomainRouteModule } from './domain/domain.module';
import { InfraestructureRouteModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [ApplicationRouteModule, DomainRouteModule, InfraestructureRouteModule]
})
export class RouteModule {}
