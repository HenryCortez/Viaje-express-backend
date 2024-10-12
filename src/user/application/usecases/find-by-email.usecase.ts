import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(email:string): Promise<any> {
    const updatedUser = await this.userRepository.findByEmail(email);
    return updatedUser;
  }
}