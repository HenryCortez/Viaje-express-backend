import { Inject, Injectable } from "@nestjs/common";
import { AssigmentRepositoryPort } from "src/travel/domain/repositories/assigment.repository.port";
import { CreateAssigmentDto } from "../../dto/create-historial.dto";

@Injectable()
export class UpdateAssigmentUseCase {
  constructor(
    @Inject('AssigmentRepository') private assigmentRepository: AssigmentRepositoryPort,
  ) {}

  async execute(id: number, assigment: Partial<CreateAssigmentDto>): Promise<any> {
    const updatedAssigment = await this.assigmentRepository.updateAssigment(id, assigment);
    return updatedAssigment;
  }
}