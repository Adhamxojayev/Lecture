import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@utils/base.response';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { bcryptHelper } from '@utils/helper';
import { ProfessorDto } from '../../professor/dto/create-professor.dto';
import { IProfessor } from '../../professor/interface/interface';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createProfessor(dto: ProfessorDto): Promise<BaseResponse<IProfessor>> {
    try {
      const professor = await this.userRepository.getUserByName(dto.username);
      if (professor) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'This username already exists',
        };
      }

      dto.password = await bcryptHelper.hash(dto.password);

      const newProfessor = await this.userRepository.createProfessor(dto);
      delete newProfessor.password;

      return {
        status: HttpStatus.CREATED,
        data: newProfessor,
        message: 'Successfully registered',
      };
    } catch (err) {
      ServiceExceptions.handle(err, AdminService.name, 'signUp');
    }
  }
}
