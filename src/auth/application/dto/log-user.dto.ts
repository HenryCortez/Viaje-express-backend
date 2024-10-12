import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LogUserDto {
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty()
    email: string;
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}