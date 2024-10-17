import { Inject, Injectable } from "@nestjs/common";

import { DetailRepositoryPort } from "src/travel/domain/repositories/detail.repository.port";
import { CreateDetailDto } from "../../dto/create-detail.dto";

@Injectable()
export class UpdateDetailUseCase {
  constructor(
    @Inject('DetailRepository') private detailRepository: DetailRepositoryPort,
  ) {}

  async execute(id: number, detail: Partial<CreateDetailDto>): Promise<any> {
    const updatedDetail = await this.detailRepository.updateDetail(id, detail);
    return updatedDetail;
  }
}