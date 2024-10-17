import { Status } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTravelDto {
  @IsNotEmpty()
  @IsDate()
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
  estimatedArrival: Date;
  @IsOptional()
  status?: Status
}
