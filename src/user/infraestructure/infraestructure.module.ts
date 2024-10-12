import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApplicatioUserModule } from '../application/application.module';
import { CommonModule } from 'src/common/common.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [ApplicatioUserModule, CommonModule],
    controllers: [UserController],
    providers: [],
    exports: [],
    
})
export class InfraestructureUserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/users/register', method: RequestMethod.POST }
        , { path: '/users/password', method: RequestMethod.PATCH }
      );
    }
}
