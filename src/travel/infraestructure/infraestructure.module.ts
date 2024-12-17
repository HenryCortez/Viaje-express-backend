import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ApplicationTravelModule } from '../application/application.module';
import { TravelController } from './controllers/travel.controller';
import { DetailController } from './controllers/detail.controller';
import { AssigmentController } from './controllers/assigment.controller';

@Module({
    imports: [CommonModule, ApplicationTravelModule],
    controllers: [TravelController, DetailController, AssigmentController],
})
export class InfraestructureTravelModule {}
