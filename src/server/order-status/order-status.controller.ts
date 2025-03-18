import { Get, Patch, Param, Controller } from '@nestjs/common';

import { OrderStatusService } from './order-status.service';

@Controller('status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param) {
    var currentOrderStatus = await this.orderStatusService.getOrderStatus(
      param.userId,
      param.orderId,
    );

    return currentOrderStatus;
  }

  @Patch('/:userId/:orderId/:status')
  async changeOrderStatus(@Param() param) {
    return await this.orderStatusService.changeOrderStatus(
      param.userId,
      param.orderId,
      param.status,
    );
  }
}
