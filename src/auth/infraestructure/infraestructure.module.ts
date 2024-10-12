// src/Infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { ApplicationAuthModule } from '../Application/application.module';
import { AuthController } from './controllers/auth.controller';
import { CommonModule } from 'src/common/common.module'; // Importa el PrismaModule


@Module({
  imports: [
    ApplicationAuthModule,
    CommonModule,
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class InfraestructureAuthModule {}
