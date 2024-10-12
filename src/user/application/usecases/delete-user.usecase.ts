import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(id:number): Promise<any> {
    const deleteUser = await this.userRepository.deleteUser(id);
    return deleteUser;
  }
}