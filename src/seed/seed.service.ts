import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { UserEntity } from '../modules/user/entities/user.entity';
import { SUPER_ADMIN } from '@utils/constants';
import { USER_ROLE, USER_STATUS } from '@utils/enums';
import { bcryptHelper } from '@utils/helper';
import * as process from 'process';

@Injectable()
export class SeedService {
  #logger = new Logger(SeedService.name);

  constructor(private readonly entityManager: EntityManager) {}

  async perform(): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      await this.createSuperAdminUser(manager);
      this.#logger.log('Seed data complete.');
    });
  }

  async createSuperAdminUser(manager: EntityManager): Promise<void> {
    const users = await manager.find(UserEntity);

    if (users.length > 0) {
      this.#logger.log('SuperAdmin user exists. Skipping seed...');
    } else {
      const user = new UserEntity();
      user.username = SUPER_ADMIN;
      user.status = USER_STATUS.ACCEPTED;
      user.role = USER_ROLE.ADMIN;
      user.password = await bcryptHelper.hash(process.env['ADMIN_PASSWORD']);

      const superAdminUser = manager.create(UserEntity, user);
      await manager.save(superAdminUser);
    }
  }
}
