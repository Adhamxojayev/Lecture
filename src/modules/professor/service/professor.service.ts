import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { IProfessor } from '../../professor/interface/interface';
import { ProfessorRepository } from '../../professor/repository/professor.repository';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(ProfessorRepository)
    private readonly professorRepository: ProfessorRepository,
  ) {}

  async getAll(): Promise<BaseResponse<IProfessor[]>> {
    try {
      const professors = await this.professorRepository.getAll();
      return {
        status: HttpStatus.OK,
        data: professors,
        message: 'list of professor',
      };
    } catch (err) {
      ServiceExceptions.handle(err, ProfessorService.name, 'getAll');
    }
  }
}
