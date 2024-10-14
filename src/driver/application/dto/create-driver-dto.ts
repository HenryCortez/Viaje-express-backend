import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { IsEcuadorianIdentityCard } from "src/common/decorators/ecuadorian-id.decorator";


export class CreateDriverDto {
    @IsNumber()
  @IsNotEmpty()
    userId: number;
    @IsString()
    @IsNotEmpty()
    @IsEcuadorianIdentityCard()
    id_card: string;
    @IsOptional()
    status?: boolean;
  }
  