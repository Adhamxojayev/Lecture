import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureRepository } from '../repository/lecture.repository';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { BaseResponse } from '@utils/base.response';
import { ILecture } from '../interface/interface';
import { isTimeSlotValid } from '@utils/isValidTime';
import { UserRepository } from '../../user/repository/user.repository';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(LectureRepository)
    private readonly lectureRepository: LectureRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateLectureDto, user): Promise<BaseResponse<ILecture>> {
    try {
      if (!isTimeSlotValid(dto.start, dto.end)) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'The hours is invalid',
        };
      }
      const inputDate = new Date(dto.date);
      const currentDate = new Date();

      currentDate.setUTCHours(0, 0, 0, 0);

      if (inputDate < currentDate) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'This date is invalid',
        };
      }

      const newLecture = await this.lectureRepository.createLacture(dto, user);

      if (!newLecture) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'There is a lecture at this time',
        };
      }

      return {
        status: HttpStatus.CREATED,
        data: newLecture,
        message: 'Successfully',
      };
    } catch (err) {
      ServiceExceptions.handle(err, LectureService.name, 'create');
    }
  }

  async getAll(): Promise<BaseResponse<ILecture[]>> {
    try {
      const lectures = await this.lectureRepository.getAll();

      return {
        status: HttpStatus.OK,
        data: lectures,
        message: 'list of lecture',
      };
    } catch (err) {
      ServiceExceptions.handle(err, LectureService.name, 'getAll');
    }
  }
}
