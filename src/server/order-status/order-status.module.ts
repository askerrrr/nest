import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from 'src/server/services/Utils';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { ItemStatusModule } from '../item-status/item-status.module';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [AuthModule, UtilsModule, ItemStatusModule],
})
export class OrderStatusModule {}
