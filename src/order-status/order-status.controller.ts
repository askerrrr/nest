import { OrderStatusService } from './order-status.service';
import { Get, Patch, Param, Controller } from '@nestjs/common';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}
  @Get('api/:userId/:orderId')
  async getOrderStatus(@Param() param) {
    return await this.orderStatusService.getOrderStatus(
      param.userId,
      param.orderId,
    );
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
