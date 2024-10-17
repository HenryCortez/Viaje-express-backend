import { Inject, Injectable } from "@nestjs/common";
import { DetailRepositoryPort } from "src/travel/domain/repositories/detail.repository.port";

@Injectable()
export class ListDetailsUseCase {
  constructor(
    @Inject('DetailRepository') private detailRepository: DetailRepositoryPort,
  ) {}

  async execute(id:number): Promise<any[]> {
    const listedDetails = await this.detailRepository.listDetails(id);
    return listedDetails;
  }
}