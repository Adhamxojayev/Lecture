import { Repository } from 'typeorm';
import { ProfessorEntity } from '../entities/professor.entity';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/db.exception';
import { SignUpDto } from '../../auth/dto/register.dto';
import { USER_ROLE, USER_STATUS } from '@utils/enums';

@CustomRepository(ProfessorEntity)
export class ProfessorRepository extends Repository<ProfessorEntity> {
  async getAll(): Promise<ProfessorEntity[]> {
    try {
      return await ProfessorEntity.find({
        select: ['id', 'firstname', 'lastname', 'username'],
      });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getProfessorByName(name: string): Promise<ProfessorEntity> {
    try {
      return await ProfessorEntity.findOne({
        where: {
          username: name,
        },
      });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async createProfessor(dto: SignUpDto): Promise<ProfessorEntity> {
    try {
      return await this.create({
        username: dto.username,
        password: dto.password,
        firstname: dto.firstname,
        lastname: dto.lastname,
      }).save();
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getProfessorById(id: number): Promise<ProfessorEntity> {
    try {
      return await this.findOneBy({ id });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async updateUserStatus(
    id: number,
    status: USER_STATUS,
  ): Promise<ProfessorEntity> {
    try {
      const user = await this.getProfessorById(id);
      user.status = status;
      await user.save();

      return user;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
