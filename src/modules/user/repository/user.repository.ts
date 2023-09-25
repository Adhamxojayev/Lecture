import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { DbExceptions } from '@utils/exceptions/db.exception';
import { SignUpDto } from '../../auth/dto/register.dto';
import { USER_ROLE, USER_STATUS } from '@utils/enums';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async getUserByName(name: string): Promise<UserEntity> {
    try {
      return await UserEntity.findOne({
        where: {
          username: name,
        },
      });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async createUser(dto: SignUpDto): Promise<UserEntity> {
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

  async createProfessor(dto: SignUpDto): Promise<UserEntity> {
    try {
      return await this.create({
        username: dto.username,
        password: dto.password,
        firstname: dto.firstname,
        lastname: dto.lastname,
        role: USER_ROLE.PROFESSOR,
      }).save();
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async getUserById(id: number): Promise<UserEntity> {
    try {
      return await this.findOneBy({ id });
    } catch (err) {
      DbExceptions.handle(err);
    }
  }

  async updateUserStatus(id: number, status: USER_STATUS): Promise<UserEntity> {
    try {
      const user = await this.getUserById(id);
      user.status = status;
      await user.save();

      return user;
    } catch (err) {
      DbExceptions.handle(err);
    }
  }
}
