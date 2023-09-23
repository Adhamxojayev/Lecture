import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [],
  providers: [JwtService],
})
export class UserModule {}
