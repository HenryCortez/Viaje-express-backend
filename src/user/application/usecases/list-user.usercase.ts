import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const users = await this.userRepository.listUsers();
    return users;
  }
}