import { Module } from '@nestjs/common';
import { ItemStatusService } from './item-status.service';
import { ItemStatusController } from './item-status.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ItemStatusController],
  providers: [ItemStatusService],
  imports: [DatabaseModule],
})
export class ItemStatusModule {}
