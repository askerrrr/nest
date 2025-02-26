import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { DatabaseModule } from 'src/database/database.module';
import { OrderStatusController } from './order-status.controller';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [DatabaseModule],
})
export class OrderStatusModule {}
