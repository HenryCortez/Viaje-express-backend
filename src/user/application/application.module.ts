import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { PrismaUserRepositoryAdapter } from '../infraestructure/repositories/prisma.user.repository.adapter';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { FindByEmailUseCase } from './usecases/find-by-email.usecase';
import { ListUserUseCase } from './usecases/list-user.usercase';
import { UpdatePasswordUseCase } from './usecases/update-password.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';

@Module({
    imports: [CommonModule],
    controllers: [],
    providers: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindByEmailUseCase,
        ListUserUseCase,
        UpdatePasswordUseCase,
        UpdateUserUseCase,
        {
            provide: 'UserRepository',
            useClass: PrismaUserRepositoryAdapter,
        }
    ],
    exports: [
        CreateUserUseCase,
        DeleteUserUseCase,
        FindByEmailUseCase,
        ListUserUseCase,
        UpdatePasswordUseCase,
        UpdateUserUseCase,
        'UserRepository',
    ],
})
export class ApplicatioUserModule {}
