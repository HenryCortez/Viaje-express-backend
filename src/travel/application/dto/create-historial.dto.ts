import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAssigmentDto {
  @IsNotEmpty()
  @IsNumber()
  driverId: number;
  @IsNotEmpty()
  @IsNumber()
  vehicleId: number;
  @IsDate()
  @IsOptional()
  updatedDate: Date;
}
