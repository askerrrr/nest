import { Get, Patch, Param, Controller } from '@nestjs/common';

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
  async changeOrderStatus(@Param() param) {
    var { userId, orderId, status } = param;
    return await this.orderStatusService.changeOrderStatus(
      userId,
      orderId,
      status,
    );
  }
}
