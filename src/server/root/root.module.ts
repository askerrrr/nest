import { Module } from '@nestjs/common';

import { RootService } from './root.service';
import { RootController } from './root.controller';

import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [DatabaseModule, AuthModule],
})
export class RootModule {}
