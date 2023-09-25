import { GeneralEntity } from '@utils/base.entity';
import { BookingEntity } from '../../booking/entities/booking.entity';
import { HallEntity } from '../../halls/entities/halls.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('lecture')
export class LectureEntity extends GeneralEntity {
  @Column({ type: 'varchar' })
  title: string;

  @ManyToOne(() => HallEntity, (hall) => hall.lecture)
  hall: HallEntity;

  @ManyToOne(() => UserEntity, (professor) => professor.lecture)
  professor: UserEntity;

  @OneToMany(() => BookingEntity, (booking) => booking.lecture)
  lecture: BookingEntity;

  @Column({ type: 'date', name: 'date', nullable: false })
  date: Date;

  @Column({ type: 'timestamp', name: 'start', nullable: false })
  start: Date;

  @Column({ type: 'timestamp', name: 'end', nullable: false })
  end: Date;
}
