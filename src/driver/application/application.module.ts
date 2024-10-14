import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateDriverUseCase } from './usecases/create-driver.usecase';
import { DeleteDriverUseCase } from './usecases/delete-driver.usecase';
import { ListDriverUseCase } from './usecases/list-drivers.usecase';
import { DriverRepositoryAdapter } from '../infraestructure/repositories/prisma.driver.repository.adapter';

@Module({
  imports: [CommonModule],
  providers: [
    CreateDriverUseCase,
    DeleteDriverUseCase,
    ListDriverUseCase,
    {
      provide: 'DriverRepository',
      useClass: DriverRepositoryAdapter,
    },
  ],
  exports: [CreateDriverUseCase, DeleteDriverUseCase, ListDriverUseCase, 'DriverRepository'],
})
export class ApplicationDriverModule {}
