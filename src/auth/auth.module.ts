import { Module } from '@nestjs/common';
import { ApplicationAuthModule } from './application/application.module';
import { DomainAuthModule } from './domain/domain.module';
import { InfraestructureAuthModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [ApplicationAuthModule, DomainAuthModule, InfraestructureAuthModule],
  exports: []
})
export class AuthModule {}
