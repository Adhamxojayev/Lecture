import { GeneralEntity } from '@utils/base.entity';
import { LectureEntity } from '../../lecture/entities/lecture.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('halls')
export class HallEntity extends GeneralEntity {
  @OneToMany(() => LectureEntity, (lecture) => lecture.lecture)
  lecture: LectureEntity;

  @Column({ type: 'smallint', default: 100 })
  places: number;
}
