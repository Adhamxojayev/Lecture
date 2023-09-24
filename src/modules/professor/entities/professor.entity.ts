import { Entity, Column } from 'typeorm';
import { GeneralEntity } from '@utils/base.entity';
import { USER_ROLE, USER_STATUS } from '@utils/enums';

@Entity('professors')
export class ProfessorEntity extends GeneralEntity {
  @Column({ type: 'varchar', name: 'firstname', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', name: 'lastname', nullable: true })
  lastname: string;

  @Column({ type: 'varchar', name: 'username', unique: true })
  username: string;

  @Column({
    type: 'enum',
    name: 'status',
    enum: USER_STATUS,
    default: USER_STATUS.ACCEPTED,
  })
  status: USER_STATUS;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: USER_ROLE,
    default: USER_ROLE.PROFESSOR,
  })
  role: USER_ROLE;
}