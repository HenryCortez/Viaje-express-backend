import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(email:string, user: Partial<CreateUserDto>): Promise<any> {
    const updatedUser = await this.userRepository.updatePassword(email, user);
    return updatedUser;
  }
}