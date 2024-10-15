import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  ocity: string;
  @IsNotEmpty()
  @IsString()
  dcity: string;
  @IsDecimal({ decimal_digits: '1,6' })
  @IsNotEmpty()
  latitudeO: string;
  @IsDecimal({ decimal_digits: '1,6' })
  @IsNotEmpty()
  longitudeO: string;
  @IsDecimal({ decimal_digits: '1,6' })
  @IsNotEmpty()
  latitudeD: string;
  @IsDecimal({ decimal_digits: '1,6' })
  @IsNotEmpty()
  longitudeD: string;
}
