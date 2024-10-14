import { IsString, IsNotEmpty,  Length, MinLength, IsOptional, IsBoolean, IsNumber } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
   licence_plate: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
   brand: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
   model: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
   color: string;


  @IsBoolean()
  @IsOptional()
   status?: boolean;

   @IsNumber()
    @IsNotEmpty()
    typeId: number;
}