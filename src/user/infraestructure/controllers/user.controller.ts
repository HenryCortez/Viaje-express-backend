import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/infraestructure/guards/auth.guard';
import { CreateUserDto } from 'src/user/application/dto/create-user.dto';
import { CreateUserUseCase } from 'src/user/application/usecases/create-user.usecase';
import { DeleteUserUseCase } from 'src/user/application/usecases/delete-user.usecase';
import { ListUserUseCase } from 'src/user/application/usecases/list-user.usercase';
import { UpdatePasswordUseCase } from 'src/user/application/usecases/update-password.usecase';
import { UpdateUserUseCase } from 'src/user/application/usecases/update-user.usecase';
  

  @Controller('users/')
  export class UserController {
    constructor(
      private createUserUseCase: CreateUserUseCase,
      private deleteUserUseCase: DeleteUserUseCase,
      private listUserUseCase: ListUserUseCase,
      private updateUserUseCase: UpdateUserUseCase,
      private updatePasswordUserUseCase: UpdatePasswordUseCase,
    ) {}
  
    @Post('/register')
    async createUser(@Res() request, @Body() user: CreateUserDto): Promise<any> {
      const userCreated = await this.createUserUseCase.execute(user);
      return request.status(HttpStatus.CREATED).json(userCreated);
    }
  
    // @Role('admin')
    // @UseGuards(AuthorizationGuard)
    @UseGuards(AuthGuard)
    @Get()
    async listUsers(@Res() request): Promise<any> {
      const users = await this.listUserUseCase.execute();
      return request.status(HttpStatus.OK).json(users);
    }

    @UseGuards(AuthGuard)
    @Patch('/profile')
    async updateUser(
      @Req() request,
      @Res() response,
      @Body() user: Partial<CreateUserDto>,
    ): Promise<any> {
      const jwt = request.user.email;
      const userUpdated = await this.updateUserUseCase.execute(jwt, user);
      return response.status(HttpStatus.OK).json(userUpdated);
    }
  
    @UseGuards(AuthGuard)
    @Patch('/password')
    async updatePassword(
      @Req() request,
      @Res() response,
      @Body() user: Partial<CreateUserDto>,
    ): Promise<any> {
      const jwt = request.user.email;
      console.log(jwt);
      const userUpdated = await this.updatePasswordUserUseCase.execute(jwt, user);
      return response.status(HttpStatus.OK).json(userUpdated);
    }
  
    // @Role('admin')
    @UseGuards(AuthGuard/*, AuthorizationGuard*/)
    @Delete(':id')
    async deleteUser(
      @Res() request,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
      await this.deleteUserUseCase.execute(id);
      return request.status(HttpStatus.NO_CONTENT).json();
    }
  
  }
  