import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetailDto {
  @IsNotEmpty()
  @IsNumber()
  travelId: number;
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  seatNumber: number;
  @IsNotEmpty()
  @IsNumber()
  normalPrice: number;
  @IsNotEmpty()
  @IsNumber()
  distanceAmount: number;
  @IsNotEmpty()
  @IsDate()
  TotalPrice: number;
}
