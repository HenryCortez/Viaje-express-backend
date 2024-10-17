import { Inject, Injectable } from "@nestjs/common";
import { DetailRepositoryPort } from "src/travel/domain/repositories/detail.repository.port";

@Injectable()
export class DeleteDetailUseCase {
  constructor(
    @Inject('DetailRepository') private detailRepository: DetailRepositoryPort,
  ) {}

  async execute(id: number, ): Promise<any> {
    const deletedDetail = await this.detailRepository.deleteDetail(id);
    return deletedDetail;
  }
}