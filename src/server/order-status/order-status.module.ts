import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from 'src/server/services/Utils';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { ItemStatusService } from '../item-status/item-status.service';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService, ItemStatusService],
  imports: [AuthModule, UtilsModule],
})
export class OrderStatusModule {}
