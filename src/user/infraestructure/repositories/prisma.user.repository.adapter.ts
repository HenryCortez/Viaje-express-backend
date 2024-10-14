import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateUserDto } from 'src/user/application/dto/create-user.dto';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';

@Injectable()
export class PrismaUserRepositoryAdapter implements UserRepositoryPort {
  constructor(private prisma: PrismaClient) {}
  async listUsers(): Promise<any[]> {
    return await this.prisma.user.findMany({
      where: {
        status: true,
      },
    });
  }
  async createUser(user: CreateUserDto): Promise<any> {
    try {
      return this.prisma.user.create({
        data: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          passwordHash: user.passwordHash,
          passwordSalt: user.passwordSalt,
          role: user.role || Role.CLIENT,
        },
      });
    } catch (error) {
      throw new HttpException('Error creando el usuario, este ya existe', 500);
    }
  }
  async updateUser(userId: number, user: Partial<CreateUserDto>): Promise<any> {
    let updatedUser = await this.findUserById(userId);
    try {
      return this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: user.name || updatedUser.name,
          surname: user.surname || updatedUser.surname,
          role: user.role || updatedUser.role,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creando el editando el usuario', 500);
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    return (await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: false,
      },
    }))
      ? true
      : false;
  }

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async updatePassword(
    email: string,
    user: Partial<CreateUserDto>,
  ): Promise<any> {
    try {
      return this.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          passwordHash: user.passwordHash,
          passwordSalt: user.passwordSalt,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error creando el editando el usuario', 500);
    }
  }

  private async findUserById(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
