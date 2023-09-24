import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { HallRepository } from './repository/halls.repository';
import { JwtService } from '@nestjs/jwt';
import { HallController } from './controller/halls.controller';
import { HallService } from './service/halls.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([HallRepository])],
  controllers: [HallController],
  providers: [HallService, JwtService],
})
export class HallModule {}
