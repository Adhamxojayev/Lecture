import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { LectureEntity } from '../entities/lecture.entity';
import { DbExceptions } from '@utils/exceptions/db.exception';

@CustomRepository(LectureEntity)
export class LectureRepository extends Repository<LectureEntity> {
  async createLacture(dto, user): Promise<LectureEntity> {
    try {
      const targetStartTime = new Date(`${dto.date}T${dto.start}:00`);
      const targetEndTime = new Date(`${dto.date}T${dto.end}:00`);

      const foundLectures = await LectureEntity.find({
        where: { date: dto.date },
      });

      for (const timeSlot of foundLectures) {
        const slotStartTime = new Date(timeSlot.date);
        const slotEndTime = new Date(timeSlot.date);
        slotStartTime.setHours(
          timeSlot.start.getHours(),
          timeSlot.start.getMinutes(),
        );
        slotEndTime.setHours(
          timeSlot.end.getHours(),
          timeSlot.end.getMinutes(),
        );

        if (
          (targetStartTime >= slotStartTime && targetStartTime < slotEndTime) ||
          (targetEndTime > slotStartTime && targetEndTime <= slotEndTime)
        ) {
          return null;
        }
      }

      const newLecture = await LectureEntity.create({
        professor: user.id,
        start: targetStartTime,
        end: targetEndTime,
        hall: dto.hallId,
        date: dto.date,
        title: dto.title,
      });

      await LectureEntity.save(newLecture);

      return newLecture;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getAll(): Promise<LectureEntity[]> {
    try {
      const lectures = await LectureEntity.find({
        select: ['id', 'title', 'date', 'start', 'end'],
      });

      return lectures;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getOne(id): Promise<LectureEntity> {
    try {
      const lecture = await LectureEntity.findOneBy({ id });

      return lecture;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
