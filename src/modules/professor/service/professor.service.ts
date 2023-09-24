import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { bcryptHelper } from '@utils/helper';
import { ProfessorDto } from 'src/modules/professor/dto/create-professor.dto';
import { IProfessor } from 'src/modules/professor/interface/interfaece';
import { ProfessorRepository } from 'src/modules/professor/repository/professor.repository';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorRepository)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async getAll(): Promise<IProfessor[]> {
    return this.professorRepository.getAll();
  }
}
