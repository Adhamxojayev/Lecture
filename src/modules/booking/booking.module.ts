import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { BookingRepository } from './repository/booking.repository';
import { JwtService } from '@nestjs/jwt';
import { BookingController } from './controller/booking.controller';
import { BookingService } from './service/booking.service';
import { LectureRepository } from '../lecture/repository/lecture.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BookingRepository, LectureRepository]),
  ],
  controllers: [BookingController],
  providers: [BookingService, JwtService],
})
export class BookingModule {}
