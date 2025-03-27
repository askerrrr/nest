import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ItemIdService } from './item-id.service';
import { ItemIdController } from './item-id.controller';

@Module({
  controllers: [ItemIdController],
  providers: [ItemIdService],
  imports: [AuthModule],
})
export class ItemIdModule {}
