import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from 'src/server/services/Utils';
import { ItemStatusService } from './item-status.service';
import { DeliveryStatusController } from './delivery-status.controller';
import { PurchasedStatusController } from './purchased-status.controller';

@Module({
  controllers: [DeliveryStatusController, PurchasedStatusController],
  providers: [ItemStatusService],
  imports: [AuthModule, UtilsModule],
})
export class ItemStatusModule {}
