import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { LectureRepository } from './repository/lecture.repository';
import { JwtService } from '@nestjs/jwt';
import { LectureController } from './controller/lecture.controller';
import { LectureService } from './service/lecture.service';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([LectureRepository, UserRepository]),
  ],
  controllers: [LectureController],
  providers: [LectureService, JwtService],
})
export class LectureModule {}
