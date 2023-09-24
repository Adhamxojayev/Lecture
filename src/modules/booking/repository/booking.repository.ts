import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { DbExceptions } from '@utils/exceptions/db.exception';

@CustomRepository(BookingEntity)
export class BookingRepository extends Repository<BookingEntity> {
  async createBooking(dto, userId): Promise<BookingEntity> {
    try {
      const booking = await BookingEntity.create({
        user: userId,
        lecture: dto.lectureId,
        place_number: dto.place_number,
      });
      await BookingEntity.save(booking);

      return booking;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async checkUserPlace(lectureId, userId): Promise<BookingEntity> {
    try {
      const foundBooking = await BookingEntity.findOneBy({
        user: { id: userId },
        lecture: { id: lectureId },
      });

      return foundBooking;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async checkPlaceNumber(placeNumber, lectureId): Promise<BookingEntity> {
    try {
      const place = await BookingEntity.findOneBy({
        place_number: placeNumber,
        lecture: { id: lectureId },
      });

      return place;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
