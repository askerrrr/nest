import { Get, Body, Patch, Param, Controller } from '@nestjs/common';

import { OrderStatusDto } from './order-status.dto';
import { OrderStatusService } from './order-status.service';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param) {
    var { userId, orderId } = param;

    var currentOrderStatus = await this.orderStatusService.getOrderStatus(
      userId,
      orderId,
    );

    return currentOrderStatus;
  }

  @Patch('/:userId/:orderId/:status')
  async changeOrderStatus(@Body() body: OrderStatusDto) {
    var { userId, orderId, orderStatus } = body;

    await this.orderStatusService.changeOrderStatus(
      userId,
      orderId,
      orderStatus,
    );
  }
}
