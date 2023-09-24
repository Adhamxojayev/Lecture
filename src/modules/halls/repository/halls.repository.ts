import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { HallEntity } from '../entities/halls.entity';
import { DbExceptions } from '@utils/exceptions/db.exception';

@CustomRepository(HallEntity)
export class HallRepository extends Repository<HallEntity> {
  async createHall(dto: any): Promise<HallEntity> {
    try {
      const newHall = await HallEntity.create(dto);
      await HallEntity.save(newHall);

      return newHall;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getAllHall(): Promise<HallEntity[]> {
    try {
      const halls = await HallEntity.find();

      return halls;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
