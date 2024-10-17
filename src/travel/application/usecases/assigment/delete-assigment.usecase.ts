import { Inject, Injectable } from "@nestjs/common";
import { AssigmentRepositoryPort } from "src/travel/domain/repositories/assigment.repository.port";

@Injectable()
export class DeleteAssigmentUseCase {
  constructor(
    @Inject('AssigmentRepository') private assigmentRepository: AssigmentRepositoryPort,
  ) {}

  async execute(id: number, ): Promise<any> {
    const deletedAssigment = await this.assigmentRepository.deleteAssigment(id);
    return deletedAssigment;
  }
}