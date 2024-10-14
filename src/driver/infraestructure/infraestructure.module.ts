import { Module } from '@nestjs/common';
import { DriverController } from './controllers/driver.controller';
import { ApplicationDriverModule } from '../application/application.module';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [ApplicationDriverModule, CommonModule],
    controllers: [DriverController],
})
export class InfraestructureDriverModule {}
