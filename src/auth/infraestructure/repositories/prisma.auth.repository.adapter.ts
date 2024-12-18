import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LogUserDto } from 'src/auth/application/dto/log-user.dto';
import { AuthRepositoryPort } from 'src/auth/Domain/repositories/auth.repository.port';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaAuthRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    private jwtService: JwtService,
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async validateUser(logUserDto: LogUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(logUserDto.email);
    

    if (
      user &&
      (await bcrypt.compare(logUserDto.password, user.passwordHash))
    ) {
      const { passwordHash, passwordSalt, ...result } = user;
      console.log(result);
      return result;
    }
    return null;
  }

  async logUser(logUserDto: LogUserDto): Promise<any> {
    var validate = await this.validateUser(logUserDto);
    console.log("--------------------");
    console.log(validate);

    if (!validate) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: logUserDto.email,
      id: validate.id,
      role: validate.role
    };

    var token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
