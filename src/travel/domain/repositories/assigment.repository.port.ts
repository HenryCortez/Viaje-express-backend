import { CreateAssigmentDto } from "src/travel/application/dto/create-historial.dto";

export interface AssigmentRepositoryPort{
    listAssigments(): Promise<any[]>;
    createAssigment(assigment: CreateAssigmentDto): Promise<any>;
    updateAssigment(id: number, assigment: Partial<CreateAssigmentDto>): Promise<any>;
    deleteAssigment(id: number): Promise<boolean>;
}