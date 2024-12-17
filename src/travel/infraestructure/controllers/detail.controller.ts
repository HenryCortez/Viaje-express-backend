import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/infraestructure/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/infraestructure/guards/auth.guard';
import { RolesGuard } from 'src/auth/infraestructure/guards/roles.guard';
import { CreateDetailDto } from 'src/travel/application/dto/create-detail.dto';
import { CreateDetailUseCase } from 'src/travel/application/usecases/detail/create-detail.usecase';
import { DeleteDetailUseCase } from 'src/travel/application/usecases/detail/delete-detail.usecase';
import { ListDetailsUseCase } from 'src/travel/application/usecases/detail/list-detail.usecase';
import { UpdateDetailUseCase } from 'src/travel/application/usecases/detail/update-detail.usecase';

@Controller('detail')
@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
export class DetailController {
  constructor(
    private readonly createDetailUsecase: CreateDetailUseCase,
    private readonly deleteDetailUsecase: DeleteDetailUseCase,
    private readonly listDetailUsecase: ListDetailsUseCase,
    private readonly updateDetailUsecase: UpdateDetailUseCase,
  ) {}

  @Post()
  async createDetail(@Res() request, @Body() detail: CreateDetailDto): Promise<any> {
    const createdDetail = await this.createDetailUsecase.execute(detail);
    return request.status(HttpStatus.CREATED).json(createdDetail);
  }

  @Get(':id')
  async listDetails(@Res() request, @Param('id', ParseIntPipe) id: number,): Promise<any> {
    const details = await this.listDetailUsecase.execute(id);
    return request.status(HttpStatus.OK).json(details);
  }

  @Patch(':id')
  async updateDetail(
    @Res() request,
    @Body() detail: Partial<CreateDetailDto>,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const updatedDetail = await this.updateDetailUsecase.execute(id, detail);
    return request.status(HttpStatus.OK).json(updatedDetail);
  }

  @Delete(':id')
  async deleteDetail(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.deleteDetailUsecase.execute(id);
    return request.status(HttpStatus.NO_CONTENT).json();
  }
}
