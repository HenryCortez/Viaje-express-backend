import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ApplicationRouteModule } from '../application/application.module';
import { RouteController } from './controllers/route.controller';

@Module({
    imports: [CommonModule, ApplicationRouteModule],
    controllers: [RouteController],
})
export class InfraestructureRouteModule {}
