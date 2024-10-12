import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { LogUserUseCase } from './usecases/log-user.usecase';
import { PrismaAuthRepositoryAdapter } from '../infraestructure/repositories/prisma.auth.repository.adapter';

@Module({
    imports: [CommonModule, UserModule],
    providers: [
      LogUserUseCase,
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepositoryAdapter,
    },
    
    ],
    exports: [
      LogUserUseCase,
      'AuthRepository'
    ],
})
export class ApplicationAuthModule {}
