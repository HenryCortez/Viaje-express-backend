import { Inject, Injectable } from "@nestjs/common";
import { AssigmentRepositoryPort } from "src/travel/domain/repositories/assigment.repository.port";

@Injectable()
export class ListAssigmentsUseCase {
  constructor(
    @Inject('AssigmentRepository') private assigmentRepository: AssigmentRepositoryPort,
  ) {}

  async execute(): Promise<any[]> {
    const listedAssigments = await this.assigmentRepository.listAssigments();
    return listedAssigments;
  }
}