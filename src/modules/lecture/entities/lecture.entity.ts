import { GeneralEntity } from '@utils/base.entity';
import { BookingEntity } from '../../booking/entities/booking.entity';
import { HallEntity } from '../../halls/entities/halls.entity';
import { ProfessorEntity } from '../../professor/entities/professor.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('lecture')
export class LectureEntity extends GeneralEntity {
  @Column({ type: 'varchar' })
  title: string;

  @ManyToOne(() => HallEntity, (hall) => hall.lecture)
  hall: HallEntity;

  @ManyToOne(() => ProfessorEntity, (professor) => professor.lecture)
  professor: ProfessorEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.lecture)
  lecture: BookingEntity;

  @Column({ type: 'date', name: 'date', nullable: false })
  date: Date;

  @Column({ type: 'timestamp', name: 'start', nullable: false })
  start: Date;

  @Column({ type: 'timestamp', name: 'end', nullable: false })
  end: Date;
}
