import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingRepository } from '../repository/booking.repository';
import { BaseResponse } from '@utils/base.response';
import { IBooking } from '../interface/interface';
import { ServiceExceptions } from '@utils/exceptions/service.exception';
import { LectureRepository } from '../../lecture/repository/lecture.repository';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingRepository)
    private readonly bookingRepository: BookingRepository,
    @InjectRepository(LectureRepository)
    private readonly lectureRepository: LectureRepository,
  ) {}

  async create(dto, user): Promise<BaseResponse<IBooking>> {
    try {
      const lecture = await this.lectureRepository.getOne(dto.lectureId);

      if (!lecture) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
          message: 'Lecture not found',
        };
      }

      const place = await this.bookingRepository.checkUserPlace(
        dto.lectureId,
        user.id,
      );

      if (place) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'You can book only 1 time',
        };
      }

      const placeNumber = await this.bookingRepository.checkPlaceNumber(
        dto.place_number,
        dto.lectureId,
      );

      if (placeNumber) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          message: 'This place is busy',
        };
      }

      const newBooking = await this.bookingRepository.createBooking(
        dto,
        user.id,
      );

      return {
        status: HttpStatus.CREATED,
        data: newBooking,
        message: 'Successfully',
      };
    } catch (err) {
      ServiceExceptions.handle(err, BookingService.name, 'create');
    }
  }
}
