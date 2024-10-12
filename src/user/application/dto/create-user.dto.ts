import { Role } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  passwordHash?: string;

  passwordSalt?: string;

  role?:     Role;
}
