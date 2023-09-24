import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorators/typeorm-ex.module';
import { ProfessorRepository } from '../professor/repository/professor.repository';
import { ProfessorController } from './controller/professor.controller';
import { ProfessorService } from './service/professor.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProfessorRepository])],
  controllers: [ProfessorController],
  providers: [ProfessorService],
})
export class ProfessorModule {}
