import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { UserRepository } from '../user/repository/user.repository';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ProfessorRepository } from '../professor/repository/professor.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, ProfessorRepository]),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
