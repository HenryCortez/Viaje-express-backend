import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { RouteModule } from './route/route.module';


@Module({
  imports: [CommonModule, AuthModule, UserModule, DriverModule, VehicleModule, RouteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
