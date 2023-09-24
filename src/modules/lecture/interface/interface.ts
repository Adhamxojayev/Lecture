import { ProfessorEntity } from '../../professor/entities/professor.entity';

export interface ILecture {
  title: string;
  professor: ProfessorEntity;
  start: Date;
  end: Date;
  date: Date;
}
