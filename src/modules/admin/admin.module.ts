import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { ProfessorRepository } from '../professor/repository/professor.repository';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([ProfessorRepository])],
  controllers: [AdminController],
  providers: [AdminService, JwtService],
})
export class AdminModule {}
