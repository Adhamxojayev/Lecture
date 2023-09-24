import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HallRepository } from '../repository/halls.repository';
import { CreateHallDto } from '../dto/create-hall.dto';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { IHall } from '../interface/interface';
import { BaseResponse } from '@utils/base.response';

@Injectable()
export class HallService {
  constructor(
    @InjectRepository(HallRepository)
    private readonly hallRepository: HallRepository,
  ) {}

  async create(dto: CreateHallDto): Promise<BaseResponse<IHall>> {
    try {
      const newHall = await this.hallRepository.createHall(dto);

      return {
        status: HttpStatus.CREATED,
        data: newHall,
        message: 'Successfully',
      };
    } catch (err) {
      ServiceExceptions.handle(err, HallService.name, 'create');
    }
  }

  async getAll(): Promise<BaseResponse<IHall[]>> {
    try {
      const halls = await this.hallRepository.getAllHall();

      return {
        status: HttpStatus.OK,
        data: halls,
        message: 'List of halls',
      };
    } catch (err) {
      ServiceExceptions.handle(err, HallService.name, 'get all');
    }
  }
}
