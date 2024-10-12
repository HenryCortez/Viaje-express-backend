import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LogUserDto } from '../../Application/dto/log-user.dto';
import { LogUserUseCase } from 'src/auth/Application/usecases/log-user.usecase';

import { JwtService } from '@nestjs/jwt';

@Controller('/auth')
export class AuthController {
  constructor(
    private logUserUseCase: LogUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async logUser(@Res() request, @Body() logUserDto: LogUserDto): Promise<any> {
    const userLogged: { access_token: string } =
      await this.logUserUseCase.execute(logUserDto);

    const decodedToken = this.jwtService.decode(userLogged.access_token);
    console.log(decodedToken);

    return request.status(HttpStatus.CREATED).json({
      user: userLogged,
    });
  }
}
