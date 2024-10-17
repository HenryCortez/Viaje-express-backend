import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ApplicationTravelModule } from '../application/application.module';
import { TravelController } from './controllers/travel.controller';

@Module({
    imports: [CommonModule, ApplicationTravelModule],
    controllers: [TravelController],
})
export class InfraestructureTravelModule {}
