import { Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from './utils/db.config';
import { dataSource } from './utils/dataSource';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/auth/guard/role.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { SeedModule } from './seed/seed.module';
import { AdminModule } from './modules/admin/admin.module';
import { ProfessorModule } from './modules/professor/professor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    ProfessorModule,
    AdminModule,
    SeedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const logger = new Logger('DataSource');
        try {
          await dataSource.initialize();
          logger.log('Data Source has been initialized');
          return dataSource;
        } catch (e) {
          logger.error(`Error during Data Source initialization: [${e}]`);
        }
      },
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
