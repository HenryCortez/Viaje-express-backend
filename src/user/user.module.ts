import { Module } from '@nestjs/common';
import { ApplicatioUserModule } from './application/application.module';
import { DomainUserModule } from './domain/domain.module';
import { InfraestructureUserModule } from './infraestructure/infraestructure.module';

@Module({
  imports: [ApplicatioUserModule, DomainUserModule, InfraestructureUserModule],
  exports: [ApplicatioUserModule, InfraestructureUserModule],
})
export class UserModule {}
