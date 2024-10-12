import { CreateUserDto } from "src/user/application/dto/create-user.dto";


export interface UserRepositoryPort {
    listUsers(): Promise<any[]>;
    createUser(user: CreateUserDto): Promise<any>;
    updateUser(userId: number,  user: Partial<CreateUserDto>): Promise<any>;
    deleteUser(userId: number): Promise<boolean>;
    findByEmail(email: string): Promise<any>;
    updatePassword(email: string, user: Partial<CreateUserDto>): Promise<any>;

    
  }
  