import { Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTravelDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  departure_datetime: Date;
  @IsNotEmpty()
  @IsNumber()
  assignmentHistoryId: number;
  @IsNotEmpty()
  @IsNumber()
  availableSeats: number;
  @IsNotEmpty()
  @IsNumber()
  routeId: number;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  estimatedArrival: Date;
  @IsOptional()
  status?: Status
}
