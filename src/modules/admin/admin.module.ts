import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { AdminController } from './controller/admin.controller';
import { AdminService } from './service/admin.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [AdminController],
  providers: [AdminService, JwtService],
})
export class AdminModule {}
