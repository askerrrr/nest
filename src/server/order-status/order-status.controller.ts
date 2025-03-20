import { Get, Body, Patch, Param, Controller } from '@nestjs/common';

import { OrderStatusDto } from './order-status.dto';
import { OrderStatusService } from './order-status.service';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param) {
    var { userId, orderId } = param;

    var currentOrderStatus: object =
      await this.orderStatusService.getOrderStatus(userId, orderId);

    return currentOrderStatus;
  }

  @Patch('/')
  async changeOrderStatus(@Body() body: OrderStatusDto): Promise<number> {
    var { userId, orderId, orderStatus } = body;

    var responseStatus: number =
      await this.orderStatusService.changeOrderStatus(
        userId,
        orderId,
        orderStatus,
      );

    return responseStatus;
  }
}
