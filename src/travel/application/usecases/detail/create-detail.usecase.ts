import { Inject, Injectable } from "@nestjs/common";
import { DetailRepositoryPort } from "src/travel/domain/repositories/detail.repository.port";
import { CreateDetailDto } from "../../dto/create-detail.dto";

@Injectable()
export class CreateDetailUseCase {
  constructor(
    @Inject('DetailRepository') private detailRepository: DetailRepositoryPort,
  ) {}

  async execute(detail: CreateDetailDto): Promise<any> {
    const createdDetail = await this.detailRepository.createDetail(detail);
    return createdDetail;
  }
}