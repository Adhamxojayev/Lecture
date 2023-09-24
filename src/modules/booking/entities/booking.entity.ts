import { GeneralEntity } from '@utils/base.entity';
import { LectureEntity } from '../../lecture/entities/lecture.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('booking')
export class BookingEntity extends GeneralEntity {
  @ManyToOne(() => LectureEntity, (lecture) => lecture.lecture)
  lecture: LectureEntity;

  @ManyToOne(() => UserEntity, (user) => user.user)
  user: UserEntity;

  @Column({ type: 'smallint' })
  place_number: number;
}
