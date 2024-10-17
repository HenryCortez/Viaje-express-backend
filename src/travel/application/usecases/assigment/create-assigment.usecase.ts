import { Inject, Injectable } from "@nestjs/common";
import { AssigmentRepositoryPort } from "src/travel/domain/repositories/assigment.repository.port";
import { CreateAssigmentDto } from "../../dto/create-historial.dto";

@Injectable()
export class CreateAssigmentUseCase {
  constructor(
    @Inject('AssigmentRepository') private assigmentRepository: AssigmentRepositoryPort,
  ) {}

  async execute(assigment: CreateAssigmentDto): Promise<any> {
    const createdAssigment = await this.assigmentRepository.createAssigment(assigment);
    return createdAssigment;
  }
}