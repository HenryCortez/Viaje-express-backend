import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(id:number, user: Partial<CreateUserDto>): Promise<any> {
    const updatedUser = await this.userRepository.updateUser(id, user);
    return updatedUser;
  }
}